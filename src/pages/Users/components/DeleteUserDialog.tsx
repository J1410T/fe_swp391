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
import { toast } from "sonner";
import { usersApi } from "@/api/resources/users";
import { User } from "@/api/resources/auth";
import { Trash2, RefreshCw } from "lucide-react";

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

  const handleDelete = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      console.log(
        `Attempting to delete user with ID: ${user.id} using hard delete`
      );

      // Use hard delete directly (soft=false)
      const response = await usersApi.delete(user.id, false);
      console.log(`Hard delete response for user ${user.id}:`, response);

      if (response && response.success) {
        toast.success("Người dùng đã được xóa thành công");
        onDeleteSuccess();
        onOpenChange(false);
      } else {
        console.error("Delete response not successful:", response);
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

      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-red-100 dark:border-red-900/30 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-red-600 dark:text-red-500 flex items-center">
            <Trash2 className="h-5 w-5 mr-2" />
            Xác nhận xóa người dùng
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-3 text-base">
            Bạn có chắc chắn muốn xóa người dùng{" "}
            <span className="font-semibold text-foreground">
              {user.username}
            </span>
            ?
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 rounded-md text-red-800 dark:text-red-300">
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">
                    Cảnh báo: Hành động này không thể hoàn tác
                  </p>
                  <p className="mt-1 text-sm">
                    Tất cả dữ liệu liên quan đến người dùng này sẽ bị xóa vĩnh
                    viễn khỏi hệ thống.
                  </p>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-2">
          <AlertDialogCancel
            disabled={isDeleting}
            className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
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
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
