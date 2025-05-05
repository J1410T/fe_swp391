import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdmissionMethod } from "@/types/entities/admission-method";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X, ExternalLink } from "lucide-react";

interface DeleteAdmissionMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  method: AdmissionMethod | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export const DeleteAdmissionMethodDialog: React.FC<DeleteAdmissionMethodDialogProps> = ({
  isOpen,
  onOpenChange,
  method,
  onConfirm,
  isLoading
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
        <DialogHeader className="bg-red-50 p-6 border-b border-red-100">
          <div className="flex items-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="mr-4 bg-red-100 p-2 rounded-full"
            >
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-bold text-red-600">Xóa phương thức tuyển sinh</DialogTitle>
              <DialogDescription className="text-red-700/70 mt-1">
                Bạn có chắc chắn muốn xóa phương thức tuyển sinh này? Hành động này không thể hoàn tác.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <AnimatePresence>
          {method && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 text-lg">{method.name}</h3>
                <p className="text-sm text-gray-600 mt-2 mb-3">{method.description}</p>

                <div className="flex items-center text-xs text-blue-600 mt-2">
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  <span className="truncate">{method.application_url}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">ID: {method.id}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    {method.applications ? method.applications.length : 0} cấu hình sẽ bị xóa
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <motion.div
            className="flex space-x-3 w-full justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="border-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="destructive"
                onClick={handleConfirm}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white rounded-full border-t-transparent"></div>
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
