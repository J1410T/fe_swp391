import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { AdmissionMethod } from "@/types";

interface SuccessScreenProps {
  addedMethod: AdmissionMethod | null;
  countdown: number;
  onContinue: () => void;
}

/**
 * Màn hình hiển thị khi thêm phương thức tuyển sinh thành công
 */
export function SuccessScreen({ 
  addedMethod, 
  countdown, 
  onContinue 
}: SuccessScreenProps): React.ReactElement {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-8 py-10 flex flex-col items-center justify-center space-y-6"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 className="h-10 w-10 text-white" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-2"
      >
        <h3 className="text-xl font-bold text-gray-800">Thêm thành công!</h3>
        <p className="text-gray-600">
          Phương thức tuyển sinh <span className="font-semibold text-orange-600">{addedMethod?.name}</span> <br />Đã được thêm vào hệ thống!!!
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 p-4 rounded-lg w-full border border-gray-200"
      >
        <h4 className="text-sm font-medium text-gray-700 mb-2">Thông tin chi tiết:</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-gray-500 w-24 flex-shrink-0">ID:</span>
            <span className="font-medium text-gray-800">{addedMethod?.id}</span>
          </li>
          <li className="flex items-start">
            <span className="text-gray-500 w-24 flex-shrink-0">Tên:</span>
            <span className="font-medium text-gray-800">{addedMethod?.name}</span>
          </li>
          <li className="flex items-start">
            <span className="text-gray-500 w-24 flex-shrink-0">Mô tả:</span>
            <span className="font-medium text-gray-800 line-clamp-2">{addedMethod?.description}</span>
          </li>
          <li className="flex items-start">
            <span className="text-gray-500 w-24 flex-shrink-0">URL đăng ký:</span>
            <span className="font-medium text-gray-800 line-clamp-2">{addedMethod?.application_url}</span>
          </li>
        </ul>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center space-x-2 text-gray-600"
      >
        <span>Tự động chuyển hướng sau</span>
        <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
          {countdown}
        </span>
        <span>giây</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button 
          onClick={onContinue}
          className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Tiếp tục
        </Button>
      </motion.div>
    </motion.div>
  );
}
