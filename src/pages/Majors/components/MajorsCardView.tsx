import React from "react";
import { Major } from "@/types/entities/major";
import { MajorCard } from "./MajorCard";
import { PaginationParams } from "@/types";
import { motion } from "framer-motion";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MajorsCardViewProps {
  majors: Major[];
  totalItems: number;
  pagination: PaginationParams;
  onPageChange: (page: number) => void;
  onView: (major: Major) => void;
  onEdit: (major: Major) => void;
  onDelete: (major: Major) => void;
}

export const MajorsCardView: React.FC<MajorsCardViewProps> = ({
  majors,
  totalItems,
  pagination,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  // Tính toán số trang
  const totalPages = Math.ceil(totalItems / pagination.limit);

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-orange-400 pl-3">Danh sách ngành học</h2>
      </motion.div>

      {!majors || majors.length === 0 ? (
        <motion.div 
          className="text-center py-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-sm flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </motion.div>
          <motion.h3 
            className="text-lg font-medium text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Không tìm thấy ngành học nào
          </motion.h3>
          <motion.p 
            className="mt-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Vui lòng thử tìm kiếm lại hoặc thêm ngành học mới.
          </motion.p>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {majors.map((major, index) => (
              <motion.div
                key={major.id || `major-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <MajorCard
                  major={major}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <nav className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => onPageChange(pagination.page - 1)}
                  className={`mx-1 rounded-md flex items-center ${
                    pagination.page === 1
                      ? "text-gray-400 cursor-not-allowed opacity-50"
                      : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </Button>

                <div className="flex space-x-1 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.div
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={pagination.page === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={`w-9 h-9 p-0 font-medium ${
                          pagination.page === page
                            ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white hover:from-orange-500 hover:to-amber-600 shadow-sm"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200"
                        }`}
                      >
                        {page}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled={pagination.page === totalPages}
                  onClick={() => onPageChange(pagination.page + 1)}
                  className={`mx-1 rounded-md flex items-center ${
                    pagination.page === totalPages
                      ? "text-gray-400 cursor-not-allowed opacity-50"
                      : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  Tiếp
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </nav>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};
