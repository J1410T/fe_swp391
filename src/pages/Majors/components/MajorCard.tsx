import React from "react";
import { Major } from "@/types/entities/major";
import { motion } from "framer-motion";
import { MoreHorizontal, Users, Award, BookOpen, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface MajorCardProps {
  major: Major;
  onView: (major: Major) => void;
  onEdit: (major: Major) => void;
  onDelete: (major: Major) => void;
}

export const MajorCard: React.FC<MajorCardProps> = ({
  major,
  onView,
  onEdit,
  onDelete,
}) => {
  // Đếm số cơ hội nghề nghiệp
  const careerCount = major.careers?.length || 0;
  
  // Lấy danh sách cơ sở đào tạo
  const uniqueCampuses = Array.from(
    new Set(
      major.majorCampusAdmissions?.map(
        (admission) => admission.campus?.code
      ) || []
    )
  );

  return (
    <motion.div 
      className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden flex flex-col h-full hover:shadow-md hover:border-orange-300 transition-all duration-300 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <motion.h3 
                className="text-lg font-semibold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {major.name}
              </motion.h3>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="outline" className="mt-1 border-orange-200 text-orange-700 bg-orange-50">
                  Mã ngành: {major.code}
                </Badge>
              </motion.div>
            </div>
            
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(major);
                      }}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Xem tùy chọn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6">
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-orange-500 mr-2" />
            <p className="text-sm text-gray-700">
              Chương trình đào tạo {major.name} chất lượng cao
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
            <Award className="h-3.5 w-3.5 mr-1 text-amber-500" />
            CƠ SỞ ĐÀO TẠO
          </p>
          <div className="flex flex-wrap">
            {uniqueCampuses.length > 0 ? uniqueCampuses.map((campus, index) => (
              <motion.div
                key={campus}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="mr-2 mb-2 bg-gradient-to-r from-orange-100 to-amber-100 text-amber-700 hover:from-orange-200 hover:to-amber-200 transition-colors"
                >
                  {campus}
                </Badge>
              </motion.div>
            )) : (
              <span className="text-xs text-gray-400 italic">Chưa có cơ sở đào tạo</span>
            )}
          </div>

          <div className="mt-4 flex items-center text-sm bg-orange-50 p-2 rounded-md border border-orange-100">
            <Users className="h-4 w-4 mr-2 text-orange-500" />
            <span className="text-orange-700 font-medium">
              {careerCount} cơ hội nghề nghiệp
            </span>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onView(major)}
              variant="outline"
              className="text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-colors group-hover:bg-orange-50 group-hover:text-orange-700 group-hover:border-orange-200"
              size="sm"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Xem chi tiết
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(major);
              }}
              variant="outline"
              className="text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
              size="sm"
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Chỉnh sửa
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(major);
              }}
              variant="outline"
              className="text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
              size="sm"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Xóa
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
