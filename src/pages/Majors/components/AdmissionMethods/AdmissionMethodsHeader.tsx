import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface AdmissionMethodsHeaderProps {
  onAddNew: () => void;
}

export const AdmissionMethodsHeader: React.FC<AdmissionMethodsHeaderProps> = ({
  onAddNew
}) => {
  return (
    <motion.div
      className="flex justify-between items-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <motion.div
          className="mr-3 p-2 bg-orange-100 rounded-lg"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <GraduationCap className="h-6 w-6 text-orange-500" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Phương thức Tuyển sinh</h2>
          <p className="text-gray-600 mt-1">Quản lý thông tin các phương thức tuyển sinh của trường</p>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onAddNew}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm phương thức
        </Button>
      </motion.div>
    </motion.div>
  );
};
