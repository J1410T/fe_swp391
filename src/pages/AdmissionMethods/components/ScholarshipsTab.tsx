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
import { Plus, Pencil, Trash2, ExternalLink, Award, Search, DollarSign, MapPin } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ScholarshipAvailability {
  id: number;
  scholarship_id: number;
  academic_year_id: number;
  campus_id: number | null;
  major_id: number | null;
  major: {
    code: string;
    name: string;
  } | null;
  campus: {
    code: string;
    name: string;
  } | null;
  academicYear: {
    year: number;
  };
}

interface Scholarship {
  id: number;
  name: string;
  description: string;
  condition: string;
  amount: number;
  application_url: string;
  availabilities: ScholarshipAvailability[];
}

interface ScholarshipsTabProps {
  academicYear: string | number;
  onRefetch: () => Promise<void>;
}

export function ScholarshipsTab({
  academicYear,
  onRefetch,
}: ScholarshipsTabProps) {
  // Dữ liệu tĩnh cho học bổng
  const staticScholarships: Scholarship[] = [
    {
      id: 1,
      name: "Học bổng Tài năng",
      description: "Dành cho sinh viên có thành tích học tập xuất sắc",
      condition: "Điểm trung bình từ 8.5 trở lên",
      amount: 10000000,
      application_url: "https://fptu.edu.vn/scholarships/talent",
      availabilities: [
        {
          id: 1,
          scholarship_id: 1,
          academic_year_id: 2024,
          campus_id: 1,
          major_id: null,
          major: null,
          campus: {
            code: "HN",
            name: "Hà Nội"
          },
          academicYear: {
            year: 2024
          }
        },
        {
          id: 2,
          scholarship_id: 1,
          academic_year_id: 2024,
          campus_id: 2,
          major_id: null,
          major: null,
          campus: {
            code: "HCM",
            name: "TP. Hồ Chí Minh"
          },
          academicYear: {
            year: 2024
          }
        }
      ]
    },
    {
      id: 2,
      name: "Học bổng Khó khăn vượt khó",
      description: "Dành cho sinh viên có hoàn cảnh khó khăn",
      condition: "Thuộc diện hộ nghèo, có thành tích học tập tốt",
      amount: 8000000,
      application_url: "https://fptu.edu.vn/scholarships/hardship",
      availabilities: [
        {
          id: 3,
          scholarship_id: 2,
          academic_year_id: 2024,
          campus_id: 1,
          major_id: null,
          major: null,
          campus: {
            code: "HN",
            name: "Hà Nội"
          },
          academicYear: {
            year: 2024
          }
        }
      ]
    },
    {
      id: 3,
      name: "Học bổng Doanh nghiệp",
      description: "Tài trợ bởi các doanh nghiệp đối tác",
      condition: "Có kỹ năng chuyên môn tốt, thái độ tích cực",
      amount: 15000000,
      application_url: "https://fptu.edu.vn/scholarships/corporate",
      availabilities: [
        {
          id: 4,
          scholarship_id: 3,
          academic_year_id: 2024,
          campus_id: 2,
          major_id: 1,
          major: {
            code: "7480103",
            name: "Kỹ thuật phần mềm"
          },
          campus: {
            code: "HCM",
            name: "TP. Hồ Chí Minh"
          },
          academicYear: {
            year: 2024
          }
        }
      ]
    }
  ];

  const [scholarships] = useState<Scholarship[]>(staticScholarships);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsEditModalOpen(true);
  };

  const handleDelete = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedScholarship) return;

    try {
      setLoading(true);
      // Mô phỏng xóa học bổng
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Đã xóa học bổng thành công");
      await onRefetch();
    } catch (error) {
      toast.error("Không thể xóa học bổng");
      console.error(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedScholarship(null);
    }
  };

  // Lọc học bổng theo năm học
  const year = typeof academicYear === 'string' ? parseInt(academicYear, 10) : academicYear;
  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.availabilities.some(availability =>
      availability.academicYear.year === year
    )
  );

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

  // Lọc học bổng theo từ khóa tìm kiếm
  const filteredResults = filteredScholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Award className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Danh sách học bổng</h3>
          </div>
          <p className="text-sm text-gray-500 pl-7">Năm học {academicYear}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm học bổng..."
              className="pl-9 w-full sm:w-[250px] border-gray-200 focus:border-purple-300 focus:ring-purple-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm học bổng
          </Button>
        </div>
      </motion.div>

      {/* Thống kê nhanh */}
      <motion.div variants={itemAnimation} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-purple-800">Tổng học bổng</p>
              <p className="text-xl font-bold">{filteredScholarships.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-800">Giá trị cao nhất</p>
              <p className="text-xl font-bold">
                {filteredScholarships.length > 0 ?
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0
                  }).format(Math.max(...filteredScholarships.map(s => s.amount)))
                : "0 đ"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-800">Phạm vi áp dụng</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Hà Nội</Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">TP. HCM</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bảng học bổng */}
      <motion.div variants={itemAnimation} className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
            <TableRow>
              <TableHead className="font-medium">Tên học bổng</TableHead>
              <TableHead className="font-medium">Điều kiện</TableHead>
              <TableHead className="text-right font-medium">Số tiền</TableHead>
              <TableHead className="text-right font-medium">Cơ sở</TableHead>
              <TableHead className="text-right font-medium">Ngành học</TableHead>
              <TableHead className="text-right font-medium">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length > 0 ? (
              filteredResults.flatMap(scholarship =>
                scholarship.availabilities
                  .filter(availability => availability.academicYear.year === year)
                  .map((availability, index) => (
                    <motion.tr
                      key={`${scholarship.id}-${availability.id}`}
                      initial={{ opacity: 0, backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                      animate={{ opacity: 1, backgroundColor: index % 2 === 0 ? "rgba(249, 250, 251, 0)" : "rgba(249, 250, 251, 0.5)" }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group hover:bg-purple-50 transition-colors duration-200"
                    >
                      <TableCell>
                        <div className="font-medium flex items-center gap-2">
                          <Award className="h-4 w-4 text-purple-500" />
                          {scholarship.name}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{scholarship.description}</p>
                      </TableCell>
                      <TableCell>{scholarship.condition}</TableCell>
                      <TableCell className="text-right font-medium text-green-700">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                          maximumFractionDigits: 0
                        }).format(scholarship.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {availability.campus?.name || 'Tất cả cơ sở'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                          {availability.major?.name || 'Tất cả ngành'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-purple-200 text-purple-500 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                                    onClick={() => handleEdit(scholarship)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Chỉnh sửa học bổng</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                                    onClick={() => handleDelete(scholarship)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Xóa học bổng</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {scholarship.application_url && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 border-green-200 text-green-500 hover:text-green-600 hover:bg-green-50 hover:border-green-300"
                                      asChild
                                    >
                                      <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Trang đăng ký</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 text-gray-500">
                    <Search className="h-10 w-10 text-gray-300" />
                    <p>Không tìm thấy học bổng nào</p>
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

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa học bổng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa học bổng này?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
              {loading ? "Đang xóa..." : "Xóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm học bổng mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin học bổng cho năm học {academicYear}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            // Mô phỏng thêm học bổng
            setTimeout(() => {
              toast.success("Thêm học bổng thành công");
              setIsAddModalOpen(false);
              setLoading(false);
              onRefetch();
            }, 500);
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Tên học bổng
                </label>
                <input
                  id="name"
                  name="name"
                  className="col-span-3 p-2 border rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="condition" className="text-right">
                  Điều kiện
                </label>
                <input
                  id="condition"
                  name="condition"
                  className="col-span-3 p-2 border rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right">
                  Số tiền
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="1000000"
                  className="col-span-3 p-2 border rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="col-span-3 p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="application_url" className="text-right">
                  URL đăng ký
                </label>
                <input
                  id="application_url"
                  name="application_url"
                  type="url"
                  className="col-span-3 p-2 border rounded"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa học bổng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin học bổng
            </DialogDescription>
          </DialogHeader>
          {selectedScholarship && (
            <form onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              // Mô phỏng cập nhật học bổng
              setTimeout(() => {
                toast.success("Cập nhật học bổng thành công");
                setIsEditModalOpen(false);
                setLoading(false);
                onRefetch();
              }, 500);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-name" className="text-right">
                    Tên học bổng
                  </label>
                  <input
                    id="edit-name"
                    name="name"
                    defaultValue={selectedScholarship.name}
                    className="col-span-3 p-2 border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-condition" className="text-right">
                    Điều kiện
                  </label>
                  <input
                    id="edit-condition"
                    name="condition"
                    defaultValue={selectedScholarship.condition}
                    className="col-span-3 p-2 border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-amount" className="text-right">
                    Số tiền
                  </label>
                  <input
                    id="edit-amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="1000000"
                    defaultValue={selectedScholarship.amount}
                    className="col-span-3 p-2 border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-description" className="text-right">
                    Mô tả
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    defaultValue={selectedScholarship.description}
                    className="col-span-3 p-2 border rounded"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-application_url" className="text-right">
                    URL đăng ký
                  </label>
                  <input
                    id="edit-application_url"
                    name="application_url"
                    type="url"
                    defaultValue={selectedScholarship.application_url}
                    className="col-span-3 p-2 border rounded"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Đang lưu..." : "Lưu"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
