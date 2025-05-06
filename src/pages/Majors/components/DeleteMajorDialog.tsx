import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { majorsApi } from "@/api/resources/majors";
import { Major } from "@/types/entities/major";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteMajorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  major: Major | null;
  onDeleted?: () => void;
}

export const DeleteMajorDialog: React.FC<DeleteMajorDialogProps> = ({
  isOpen,
  onOpenChange,
  major,
  onDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogState, setDialogState] = useState<"confirm" | "success" | "error">("confirm");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDelete = async () => {
    if (!major || !major.id) {
      setDialogState("error");
      setErrorMessage("Không thể xóa ngành học. Thông tin không hợp lệ.");
      toast.error("Không thể xóa ngành học. Thông tin không hợp lệ.");
      return;
    }

    try {
      setIsDeleting(true);
      const response = await majorsApi.delete(Number(major.id));

      if (response.success) {
        // Hiển thị thông báo thành công
        setDialogState("success");
        toast.success(`Đã xóa ngành học ${major.name} thành công!`);

        // Đặt timeout để đóng dialog sau khi hiển thị thông báo
        setTimeout(() => {
          onOpenChange(false);
          setDialogState("confirm");

          // Callback sau khi xóa thành công
          if (onDeleted) {
            onDeleted();
          }
        }, 2000);
      } else {
        // Hiển thị thông báo lỗi
        setDialogState("error");
        setErrorMessage(response.message || "Có lỗi xảy ra khi xóa ngành học");
        toast.error(response.message || "Có lỗi xảy ra khi xóa ngành học");
      }
    } catch (error) {
      console.error("Lỗi khi xóa ngành học:", error);
      // Hiển thị thông báo lỗi
      setDialogState("error");
      setErrorMessage("Có lỗi xảy ra khi xóa ngành học");
      toast.error("Có lỗi xảy ra khi xóa ngành học");
    } finally {
      setIsDeleting(false);
    }
  };

  // Reset state khi dialog đóng
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDialogState("confirm");
      setErrorMessage("");
    }
    onOpenChange(open);
  };

  if (!major) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="bg-white">
        {dialogState === "confirm" && (
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <AlertDialogTitle className="text-center text-lg font-semibold text-gray-900">
              Xác nhận xóa ngành học
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-500">
              Bạn có chắc chắn muốn xóa ngành học{" "}
              <span className="font-medium text-gray-900">{major.name}</span>? <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
        )}

        {dialogState === "success" && (
          <div className="py-6 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Xóa thành công</h2>
            <p className="text-green-700">
              Đã xóa ngành học <span className="font-medium">{major.name}</span> thành công!
            </p>
          </div>
        )}

        {dialogState === "error" && (
          <div className="py-6 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Lỗi</h2>
            <p className="text-red-700">{errorMessage}</p>
            <Button
              variant="outline"
              className="mt-4 bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
              onClick={() => setDialogState("confirm")}
            >
              Thử lại
            </Button>
          </div>
        )}
        {dialogState === "confirm" && (
          <AlertDialogFooter className="sm:justify-center space-x-3 mt-6">
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300 min-w-[100px]"
              >
                Hủy bỏ
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white min-w-[100px]"
              >
                {isDeleting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Đang xóa...
                  </>
                ) : (
                  "Xác nhận xóa"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
