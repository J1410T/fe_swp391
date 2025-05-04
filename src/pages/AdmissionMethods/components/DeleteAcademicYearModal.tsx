import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteAcademicYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  year: string;
}

export function DeleteAcademicYearModal({
  isOpen,
  onClose,
  onSuccess,
  year,
}: DeleteAcademicYearModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Mô phỏng API gọi để xóa năm tuyển sinh
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(`Đã xóa năm tuyển sinh ${year}`);
      await onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Không thể xóa năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa năm tuyển sinh</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa năm tuyển sinh {year}? Hành động này sẽ xóa tất cả dữ liệu liên quan đến năm này và không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Đang xóa..." : "Xóa năm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
