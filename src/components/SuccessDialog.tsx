import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  autoCloseDelay?: number; // Thời gian tự động đóng (ms)
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  autoCloseDelay = 3000, // Mặc định tự động đóng sau 3 giây
}) => {
  // State để theo dõi thời gian còn lại trước khi đóng
  const [timeLeft, setTimeLeft] = useState(Math.floor(autoCloseDelay / 1000));

  useEffect(() => {
    if (!isOpen) return;

    // Reset thời gian khi dialog mở
    setTimeLeft(Math.floor(autoCloseDelay / 1000));

    // Tự động đóng dialog sau khoảng thời gian đã định
    const closeTimer = setTimeout(() => {
      onClose();
    }, autoCloseDelay);

    // Cập nhật đếm ngược mỗi giây
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup timers khi component unmount hoặc dialog đóng
    return () => {
      clearTimeout(closeTimer);
      clearInterval(countdownTimer);
    };
  }, [isOpen, autoCloseDelay, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-green-200 p-0">
        <div className="p-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-5">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-base text-gray-600 mb-6">{message}</p>
          <div className="text-sm text-gray-500 animate-pulse">
            Cửa sổ này sẽ tự động đóng sau {timeLeft} giây...
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
