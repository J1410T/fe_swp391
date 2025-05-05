import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink, Search, FileText, Link2, Settings } from "lucide-react";
import { AdmissionMethod, AdmissionMethodApplication } from "@/types/entities/admission-method";
import { AdmissionMethodApplicationItem } from "./AdmissionMethodApplicationItem";

interface AdmissionMethodsCardsProps {
  methods: AdmissionMethod[];
  onEdit: (method: AdmissionMethod) => void;
  onDelete?: (method: AdmissionMethod) => void;
  getCampusName: (code?: string) => string;
  getMajorName: (code?: string) => string;
}

export const AdmissionMethodsCards: React.FC<AdmissionMethodsCardsProps> = ({
  methods,
  onEdit,
  onDelete,
  getCampusName,
  getMajorName
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {methods.length === 0 ? (
          <motion.div
            className="col-span-full text-center py-12 text-gray-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
            >
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            </motion.div>
            <p className="text-lg font-medium">Không tìm thấy phương thức tuyển sinh nào</p>
            <p className="text-sm text-gray-400 mt-2">Hãy thử tìm kiếm với từ khóa khác hoặc thêm mới</p>
          </motion.div>
        ) : (
          methods.map((method) => (
            <motion.div
              key={method.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full"
              layoutId={`card-${method.id}`}
            >
              <motion.div
                className="p-5 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 flex items-center flex-shrink-0"
              >
                <motion.div
                  className="bg-white p-2 rounded-full mr-3 shadow-sm"
                  whileHover={{ rotate: 15 }}
                >
                  <FileText className="h-5 w-5 text-orange-500" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 flex-grow">{method.name}</h3>
                <motion.div
                  className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {method.applications ? method.applications.length : 0} cấu hình
                </motion.div>
              </motion.div>

              <div className="p-5 flex-grow flex flex-col">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{method.description}</p>

                <motion.a
                  href={method.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center text-sm mb-4 p-2 rounded-md border border-blue-100 bg-blue-50"
                  whileHover={{ x: 3 }}
                >
                  <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="truncate flex-grow">{method.application_url}</span>
                  <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                </motion.a>

                {/* Phần cấu hình - luôn hiển thị dù có hay không có cấu hình */}
                <motion.div
                  className="border-t border-gray-100 pt-4 mt-4 flex-grow flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <Settings className="h-4 w-4 text-gray-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Cấu hình áp dụng:</h4>
                  </div>

                  {method.applications && method.applications.length > 0 ? (
                    <div className={method.applications.length > 1 ? "overflow-visible max-h-[120px] pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100" : ""}>
                      <ul className="space-y-2">
                        {method.applications.map((app: AdmissionMethodApplication, index: number) => (
                          <div className="overflow-visible" key={index}>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="overflow-visible"
                            >
                              <AdmissionMethodApplicationItem
                                application={app}
                                index={index}
                                getCampusName={getCampusName}
                                getMajorName={getMajorName}
                              />
                            </motion.div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-4 px-3 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex-grow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-xs text-gray-400 text-center">
                        Chưa có cấu hình áp dụng nào cho phương thức này
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <motion.div
                className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-end space-x-2 flex-shrink-0 mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
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
                      className="h-8 px-3 text-red-600 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      onClick={() => onDelete(method)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Xóa
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};
