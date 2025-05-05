import { Award, ExternalLink, Pencil, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { ScholarshipResponse } from "@/types/entities/scholarship";

interface ScholarshipTableProps {
  filteredResults: ScholarshipResponse[];
  year: number;
  searchTerm: string;
  onSearchClear: () => void;
  onEdit: (scholarship: ScholarshipResponse) => void;
  onDelete: (scholarship: ScholarshipResponse) => void;
  itemAnimation: any;
}

export function ScholarshipTable({
  filteredResults,
  year,
  searchTerm,
  onSearchClear,
  onEdit,
  onDelete,
  itemAnimation
}: ScholarshipTableProps) {
  return (
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
                                  onClick={() => onEdit(scholarship)}
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
                                  onClick={() => onDelete(scholarship)}
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
                      onClick={onSearchClear}
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
  );
}
