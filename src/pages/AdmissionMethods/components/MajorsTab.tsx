import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Eye, School, Search, FileText, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { AddMajorModal } from "../../../pages/AdmissionMethods/components/AddMajorModal";
import { majorsApi, MajorWithCampusData } from "@/api/resources/majors";

interface MajorsTabProps {
  academicYear: string | number;
  onRefetch: () => Promise<void>;
}

export function MajorsTab({
  academicYear,
  onRefetch,
}: MajorsTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState<MajorWithCampusData[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Hàm để lấy dữ liệu ngành học từ API
  const fetchMajors = async () => {
    try {
      setFetchLoading(true);
      setError(null);

      const response = await majorsApi.getByAcademicYear(academicYear);

      if (response.success && response.data) {
        setMajors(response.data);
      } else {
        throw new Error(response.message || "Không thể lấy dữ liệu ngành học");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      setError(error);
      toast.error("Không thể lấy dữ liệu ngành học");
    } finally {
      setFetchLoading(false);
    }
  };

  // Gọi API khi component được mount hoặc academicYear thay đổi
  useEffect(() => {
    fetchMajors();
  }, [academicYear]);

  const handleDelete = (majorId: number) => {
    setSelectedMajorId(majorId);
    setIsDeleteModalOpen(true);
  };

  const handleViewDetails = (major: any) => {
    setSelectedMajor(major);
    setIsViewModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMajorId) return;

    try {
      setLoading(true);

      // Gọi API để xóa ngành học
      await majorsApi.delete(selectedMajorId);

      toast.success("Đã xóa ngành học khỏi năm tuyển sinh");

      // Cập nhật lại dữ liệu
      await fetchMajors();
      await onRefetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể xóa ngành học";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedMajorId(null);
    }
  };

  // Hiệu ứng animation
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Lọc ngành học theo từ khóa tìm kiếm
  const filteredMajors = majors.filter(major =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    major.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chuyển đổi dữ liệu từ API sang định dạng hiển thị, gộp các cơ sở của cùng một ngành
  const transformedMajors = filteredMajors.map(major => {
    // Lọc các campus admissions theo năm học hiện tại
    const relevantAdmissions = major.majorCampusAdmissions.filter(
      admission => String(admission.academicYear.year) === String(academicYear)
    );

    // Tính tổng chỉ tiêu của tất cả các cơ sở
    const totalQuota = relevantAdmissions.reduce((sum, admission) => sum + admission.quota, 0);

    // Lấy học phí (giả sử học phí giống nhau ở tất cả các cơ sở, lấy cái đầu tiên)
    const tuition = relevantAdmissions.length > 0 ? relevantAdmissions[0].tuition_fee : 0;

    // Tạo mảng các cơ sở
    const campuses = relevantAdmissions.map(admission => ({
      name: admission.campus.name,
      code: admission.campus.code,
      quota: admission.quota
    }));

    // Trả về một đối tượng duy nhất cho mỗi ngành
    return {
      id: major.id,
      name: major.name,
      code: major.code,
      tuition: tuition,
      totalQuota: totalQuota,
      campuses: campuses
    };
  });

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Hiển thị trạng thái loading */}
      {fetchLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-orange-500">Đang tải dữ liệu...</span>
        </div>
      )}

      {/* Hiển thị thông báo lỗi */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Lỗi khi tải dữ liệu</p>
          <p className="text-sm">{error.message}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-red-200 text-red-600 hover:bg-red-50"
            onClick={fetchMajors}
          >
            Thử lại
          </Button>
        </div>
      )}
      {/* Header và thanh tìm kiếm */}
      <motion.div variants={itemAnimation} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <School className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Danh sách ngành tuyển sinh</h3>
          </div>
          <p className="text-sm text-gray-500 pl-7">Năm học {academicYear}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm ngành học..."
              className="pl-9 w-full sm:w-[250px] border-gray-200 focus:border-orange-300 focus:ring-orange-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm ngành
          </Button>
        </div>
      </motion.div>

      {/* Thống kê nhanh */}
      <motion.div variants={itemAnimation} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-800">Tổng ngành</p>
              <p className="text-xl font-bold">{majors.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-800">Chỉ tiêu</p>
              <p className="text-xl font-bold">{transformedMajors.reduce((sum, item) => sum + item.totalQuota, 0)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 col-span-1 sm:col-span-2 md:col-span-2">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <School className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-purple-800">Cơ sở đào tạo</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {/* Lấy danh sách các cơ sở đào tạo duy nhất từ dữ liệu */}
                {Array.from(
                  new Set(
                    transformedMajors.flatMap(item =>
                      item.campuses.map(campus => campus.name)
                    )
                  )
                ).map(campusName => {
                  // Rút gọn tên cơ sở để hiển thị
                  const shortName = campusName
                    .replace("Đại học FPT - ", "")
                    .replace("TP. ", "");

                  return (
                    <Badge
                      key={campusName}
                      className="bg-purple-100 text-purple-800 hover:bg-purple-200 px-2 py-1"
                      title={campusName}
                    >
                      {shortName}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bảng ngành học */}
      <motion.div variants={itemAnimation} className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[90px] font-medium">Mã ngành</TableHead>
              <TableHead className="w-[220px] font-medium">Tên ngành</TableHead>
              <TableHead className="text-right font-medium w-[120px]">Học phí</TableHead>
              <TableHead className="text-right font-medium w-[80px]">Chỉ tiêu</TableHead>
              <TableHead className="text-right font-medium w-[110px]">Cơ sở</TableHead>
              <TableHead className="text-right font-medium w-[80px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transformedMajors.length > 0 ? (
              transformedMajors.map((item, index) => (
                <motion.tr
                  key={`${item.id}`}
                  initial={{ opacity: 0, backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                  animate={{ opacity: 1, backgroundColor: index % 2 === 0 ? "rgba(249, 250, 251, 0)" : "rgba(249, 250, 251, 0.5)" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group hover:bg-orange-50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-blue-700 py-3">{item.code}</TableCell>
                  <TableCell className="font-medium py-3 relative group/name">
                    <div className="truncate max-w-[200px] group-hover/name:text-blue-600 transition-colors duration-200">
                      {item.name.length > 30
                        ? `${item.name.substring(0, 27)}...`
                        : item.name}
                    </div>
                    {/* Hiển thị tooltip khi tên ngành dài */}
                    {item.name.length > 25 && (
                      <div className="absolute left-0 top-[calc(100%+5px)] z-10 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm max-w-[300px] opacity-0 invisible group-hover/name:opacity-100 group-hover/name:visible transition-all duration-200 delay-200 pointer-events-none">
                        <div className="font-medium text-blue-700 mb-1">Tên ngành đầy đủ:</div>
                        {item.name}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-3 font-medium">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                      maximumFractionDigits: 0
                    }).format(item.tuition)}
                  </TableCell>
                  <TableCell className="text-right py-3 font-medium">{item.totalQuota}</TableCell>
                  <TableCell className="text-right py-3">
                    <div className="flex gap-1 justify-end ml-auto">
                      {item.campuses.map(campus => (
                        <Badge
                          key={campus.code}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105 transition-transform whitespace-nowrap px-1.5 py-0.5 text-xs"
                          title={`${campus.name}: ${campus.quota} chỉ tiêu`}
                        >
                          {campus.code}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-3">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-blue-200 text-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 text-gray-500">
                    <Search className="h-10 w-10 text-gray-300" />
                    <p>Không tìm thấy ngành học nào</p>
                    {searchTerm && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm("")}
                      >
                        Xóa tìm kiếm
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <AddMajorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        academicYear={academicYear}
        onSuccess={async () => {
          await fetchMajors();
          await onRefetch();
        }}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa ngành học</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa ngành học này khỏi năm tuyển sinh {academicYear}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? "Đang xóa..." : "Xóa ngành học"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal xem chi tiết ngành học */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
            <DialogHeader className="mb-2">
              <DialogTitle className="flex items-center gap-2 text-blue-700 text-xl">
                <div className="bg-blue-100 p-2 rounded-full">
                  <School className="h-5 w-5" />
                </div>
                Chi tiết ngành học
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Thông tin chi tiết về ngành học và các cơ sở đào tạo
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedMajor && (
            <div className="p-6 space-y-6">
              {/* Thông tin cơ bản */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">Mã ngành</span>
                    <span className="font-semibold text-blue-700 text-lg">{selectedMajor.code}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">Học phí</span>
                    <span className="font-semibold  text-green-700 text-lg">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0
                      }).format(selectedMajor.tuition)}
                    </span>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">Tên ngành</span>
                    <span className="font-semibold text-lg leading-tight">{selectedMajor.name}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">Tổng chỉ tiêu</span>
                    <span className="font-semibold text-orange-600 text-lg">{selectedMajor.totalQuota}</span>
                  </div>
                </div>
              </div>

              {/* Danh sách cơ sở */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-purple-100 p-1.5 rounded-full">
                    <School className="h-4 w-4 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-700">Cơ sở đào tạo</h4>
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-2 px-4 text-left font-medium text-sm">Mã cơ sở</th>
                        <th className="py-2 px-4 text-left font-medium text-sm">Tên cơ sở</th>
                        <th className="py-2 px-4 text-right font-medium text-sm">Chỉ tiêu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedMajor.campuses.map((campus: any, index: number) => (
                        <tr
                          key={campus.code}
                          className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                        >
                          <td className="py-3 px-4">
                            <Badge className="bg-blue-100 text-blue-800 font-medium">{campus.code}</Badge>
                          </td>
                          <td className="py-3 px-4 font-medium">{campus.name}</td>
                          <td className="py-3 px-4 text-right font-semibold text-blue-700">{campus.quota}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Nút đóng */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 transition-all duration-200"
                >
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
