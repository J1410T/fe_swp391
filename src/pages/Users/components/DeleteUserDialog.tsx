import React, { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { usersApi } from "@/api/resources/users";
import { User } from "@/api/resources/auth";
import {
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onDeleteSuccess: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  isOpen,
  onOpenChange,
  user,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogState, setDialogState] = useState<
    "confirm" | "success" | "error"
  >("confirm");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle dialog close with state reset
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setDialogState("confirm");
        setErrorMessage("");
      }, 300);
    }
    onOpenChange(open);
  };

  const handleDelete = async () => {
    if (!user) return;

    setIsDeleting(true);
    setDialogState("confirm");
    setErrorMessage("");

    try {
      console.log(
        `Attempting to delete user with ID: ${user.id} using hard delete`
      );

      // Use hard delete directly (soft=false)
      const response = await usersApi.delete(user.id, false);
      console.log(`Hard delete response for user ${user.id}:`, response);

      if (response && response.success) {
        // Show success state
        setDialogState("success");
        toast.success("Người dùng đã được xóa thành công");

        // Close dialog after a short delay
        setTimeout(() => {
          onDeleteSuccess();
          handleOpenChange(false);
        }, 1500);
      } else {
        console.error("Delete response not successful:", response);
        setDialogState("error");
        setErrorMessage(
          response?.message || "Không thể xóa người dùng. Vui lòng thử lại sau."
        );
        toast.error(
          response?.message || "Không thể xóa người dùng. Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      // Extract error message from response if available
      let errorMessage =
        "Có lỗi xảy ra khi xóa người dùng. Vui lòng thử lại sau.";

      if (error && typeof error === "object") {
        // Use a more specific type for the error
        interface ErrorWithResponse {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        }

        const err = error as ErrorWithResponse;
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      setDialogState("error");
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="border-red-100 shadow-lg">
        {/* Confirmation State */}
        {dialogState === "confirm" && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center">
                <Trash2 className="h-5 w-5 mr-2" />
                Xác nhận xóa người dùng
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-3 text-base">
                Bạn có chắc chắn muốn xóa người dùng{" "}
                <span className="font-semibold text-foreground">
                  {user.username}
                </span>
                ?
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-red-800">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        Cảnh báo: Hành động này không thể hoàn tác
                      </p>
                      <p className="mt-1 text-sm">
                        Tất cả dữ liệu liên quan đến người dùng này sẽ bị xóa
                        vĩnh viễn khỏi hệ thống.
                      </p>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-2">
              <AlertDialogCancel
                disabled={isDeleting}
                className="border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Hủy bỏ
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm hover:shadow transition-all"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa người dùng
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}

        {/* Success State */}
        {dialogState === "success" && (
          <div className="py-6 px-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Xóa thành công
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Người dùng {user.username} đã được xóa thành công khỏi hệ thống.
            </p>
          </div>
        )}

        {/* Error State */}
        {dialogState === "error" && (
          <div className="py-4 px-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
              Lỗi khi xóa người dùng
            </h3>

            <Alert
              variant="destructive"
              className="mb-4 bg-red-50 border-red-200"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2 mt-4">
              <AlertDialogCancel
                className="border-gray-300 hover:bg-gray-100 transition-colors"
                onClick={() => setDialogState("confirm")}
              >
                Thử lại
              </AlertDialogCancel>
              <AlertDialogCancel
                className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 transition-colors"
                onClick={() => handleOpenChange(false)}
              >
                Đóng
              </AlertDialogCancel>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
