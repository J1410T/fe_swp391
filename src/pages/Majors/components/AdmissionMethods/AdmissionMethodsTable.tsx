import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink, Search, FileText, Link2 } from "lucide-react";
import { AdmissionMethod } from "@/types/entities/admission-method";

interface AdmissionMethodsTableProps {
  methods: AdmissionMethod[];
  onEdit: (method: AdmissionMethod) => void;
  onDelete?: (method: AdmissionMethod) => void;
}

export const AdmissionMethodsTable: React.FC<AdmissionMethodsTableProps> = ({
  methods,
  onEdit,
  onDelete
}) => {
  // Animation variants

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      className="overflow-x-auto rounded-lg shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-orange-500" />
                Tên phương thức
              </div>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Mô tả</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              <div className="flex items-center">
                <Link2 className="h-4 w-4 mr-2 text-orange-500" />
                URL đăng ký
              </div>
            </th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700">Số câu hình</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {methods.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg">Không tìm thấy phương thức tuyển sinh nào</p>
                    <p className="text-sm text-gray-400 mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc thêm mới</p>
                  </motion.div>
                </td>
              </motion.tr>
            ) : (
              <>
                {methods.map((method, index) => (
                  <motion.tr
                    key={method.id}
                    variants={rowVariants}
                    className="border-b border-gray-200 hover:bg-orange-50/30 transition-colors duration-150"
                    whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.05)" }}
                    custom={index}
                  >
                    <td className="py-4 px-4 font-medium text-gray-800">{method.name}</td>
                    <td className="py-4 px-4">
                      <div className="max-w-md truncate text-gray-600">{method.description}</div>
                    </td>
                    <td className="py-4 px-4">
                      <motion.a
                        href={method.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        Liên kết <ExternalLink className="h-3 w-3 ml-1" />
                      </motion.a>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
                        {method.applications ? method.applications.length : 0}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                            onClick={() => onEdit(method)}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Sửa
                          </Button>
                        </motion.div>

                        {onDelete && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-red-600 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                              onClick={() => onDelete(method)}
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Xóa
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
};
