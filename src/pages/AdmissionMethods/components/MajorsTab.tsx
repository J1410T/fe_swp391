import { useState } from "react";
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

interface MajorsTabProps {
  academicYear: string;
  onRefetch: () => Promise<void>;
}

export function MajorsTab({
  academicYear,
  onRefetch,
}: MajorsTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Không cần chuyển đổi academicYear sang number khi sử dụng dữ liệu tĩnh

  // Dữ liệu tĩnh cho ngành học
  const staticMajors = [
    {
      id: 1,
      name: "Kỹ thuật phần mềm",
      code: "7480103",
      campusData: [
        { campus: "Hà Nội", tuition: 33000000, quota: 200 },
        { campus: "TP. Hồ Chí Minh", tuition: 33000000, quota: 200 },
        { campus: "Đà Nẵng", tuition: 33000000, quota: 200 },
        { campus: "Cần Thơ", tuition: 33000000, quota: 200 },
        { campus: "Quy Nhơn", tuition: 33000000, quota: 200 },
      ]
    },
    {
      id: 2,
      name: "An toàn công nghệ thông tin",
      code: "7480202",
      campusData: [
        { campus: "Hà Nội", tuition: 33000000, quota: 180 },
        { campus: "TP. Hồ Chí Minh", tuition: 33000000, quota: 180 },
        { campus: "Đà Nẵng", tuition: 33000000, quota: 150 },
      ]
    },
    {
      id: 3,
      name: "Trí tuệ nhân tạo",
      code: "7480107",
      campusData: [
        { campus: "Hà Nội", tuition: 35000000, quota: 150 },
        { campus: "TP. Hồ Chí Minh", tuition: 35000000, quota: 150 },
      ]
    },
    {
      id: 4,
      name: "Thiết kế mỹ thuật số",
      code: "7210403",
      campusData: [
        { campus: "Hà Nội", tuition: 30000000, quota: 120 },
        { campus: "TP. Hồ Chí Minh", tuition: 30000000, quota: 120 },
      ]
    },
    {
      id: 5,
      name: "Hệ thống thông tin",
      code: "7480104",
      campusData: [
        { campus: "Hà Nội", tuition: 33000000, quota: 180 },
        { campus: "TP. Hồ Chí Minh", tuition: 33000000, quota: 180 },
        { campus: "Đà Nẵng", tuition: 33000000, quota: 150 },
      ]
    },
  ];

  const handleDelete = (majorId: number) => {
    setSelectedMajorId(majorId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMajorId) return;

    try {
      setLoading(true);
      // Mô phỏng xóa ngành học
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Đã xóa ngành học khỏi năm tuyển sinh");
      await onRefetch();
    } catch (error) {
      toast.error("Không thể xóa ngành học");
      console.error(error);
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
  const filteredMajors = staticMajors.filter(major => 
    major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    major.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
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
              <p className="text-xl font-bold">{staticMajors.length}</p>
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
              <p className="text-xl font-bold">{staticMajors.reduce((sum, major) => 
                sum + major.campusData.reduce((campusSum, campus) => campusSum + campus.quota, 0), 0)}</p>
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
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Hà Nội</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">TP. Hồ Chí Minh</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Đà Nẵng</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Cần Thơ</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Quy Nhơn</Badge>
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
              <TableHead className="w-[100px] font-medium">Mã ngành</TableHead>
              <TableHead className="font-medium">Tên ngành</TableHead>
              <TableHead className="text-right font-medium">Học phí</TableHead>
              <TableHead className="text-right font-medium">Chỉ tiêu</TableHead>
              <TableHead className="text-right font-medium">Cơ sở</TableHead>
              <TableHead className="text-right font-medium">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMajors.length > 0 ? (
              filteredMajors.flatMap(major => 
                major.campusData.map((campus, index) => (
                  <motion.tr 
                    key={`${major.id}-${campus.campus}`}
                    initial={{ opacity: 0, backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                    animate={{ opacity: 1, backgroundColor: index % 2 === 0 ? "rgba(249, 250, 251, 0)" : "rgba(249, 250, 251, 0.5)" }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group hover:bg-orange-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-blue-700">{major.code}</TableCell>
                    <TableCell className="font-medium">{major.name}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0
                      }).format(campus.tuition)}
                    </TableCell>
                    <TableCell className="text-right">{campus.quota}</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {campus.campus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-blue-200 text-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                            onClick={() => handleDelete(major.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              )
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
        onSuccess={onRefetch}
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
    </motion.div>
  );
}
