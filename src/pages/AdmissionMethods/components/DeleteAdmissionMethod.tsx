import { useState, useEffect } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { toast } from "sonner";
import { DeleteSuccessScreen } from "./DeleteSuccessScreen";
import type { AdmissionMethod } from "@/types";

interface DeleteAdmissionMethodProps {
  method: AdmissionMethod;
  onSuccess: () => void;
}

/**
 * Component xóa phương thức tuyển sinh
 */
export function DeleteAdmissionMethod({ method, onSuccess }: DeleteAdmissionMethodProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [deletedMethod, setDeletedMethod] = useState<AdmissionMethod | null>(null);

  // Xử lý đếm ngược sau khi xóa thành công
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showSuccess && countdown === 0) {
      setOpen(false);
      setShowSuccess(false);
      setCountdown(5);
      onSuccess(); // Gọi callback để cập nhật danh sách
    }
    return () => clearTimeout(timer);
  }, [showSuccess, countdown, onSuccess]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      // Lưu thông tin phương thức trước khi xóa để hiển thị trong màn hình thành công
      setDeletedMethod({...method});
      
      // Gọi API xóa phương thức tuyển sinh
      const response = await admissionMethodsApi.delete(String(method.id));
      
      if (response.success) {
        toast.success("Xóa phương thức tuyển sinh thành công");
        
        // Hiển thị màn hình thành công
        setShowSuccess(true);
      } else {
        toast.error(response.message || "Xóa phương thức tuyển sinh thất bại");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi khi xóa phương thức tuyển sinh";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Xử lý đóng dialog
  const handleContinue = () => {
    setOpen(false);
    setShowSuccess(false);
    setCountdown(5);
    onSuccess();
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Button variant="destructive" size="sm" className="hover:bg-red-600">
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Xóa
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl border border-gray-200 bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {showSuccess ? (
            <DeleteSuccessScreen 
              deletedMethod={deletedMethod} 
              countdown={countdown} 
              onContinue={handleContinue} 
            />
          ) : (
            <div className="p-6">
              <AlertDialog.Title className="text-xl font-semibold text-gray-900">
                Xác nhận xóa
              </AlertDialog.Title>
              <AlertDialog.Description className="mt-3 text-gray-600">
                Bạn có chắc chắn muốn xóa phương thức tuyển sinh <span className="font-semibold text-gray-900">"{method.name}"</span>? Hành động này không thể hoàn tác.
              </AlertDialog.Description>
              <div className="mt-6 flex justify-end space-x-3">
                <AlertDialog.Cancel asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300 font-medium transition-colors"
                  >
                    Hủy
                  </Button>
                </AlertDialog.Cancel>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xóa"
                  )}
                </Button>
              </div>
            </div>
          )}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
