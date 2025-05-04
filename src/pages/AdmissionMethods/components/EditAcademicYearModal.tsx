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
import { Label } from "@/components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface EditAcademicYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  year: string;
  description?: string;
}

export function EditAcademicYearModal({
  isOpen,
  onClose,
  onSuccess,
  year,
  description = "",
}: EditAcademicYearModalProps) {
  const [yearDescription, setYearDescription] = useState<string>(description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Mô phỏng API gọi để cập nhật năm tuyển sinh
      // Trong thực tế, bạn sẽ gọi API thực tế ở đây
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(`Đã cập nhật năm tuyển sinh ${year}`);
      await onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa năm tuyển sinh</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cho năm tuyển sinh {year}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="year">Năm tuyển sinh</Label>
            <Input
              id="year"
              value={year}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả cho năm tuyển sinh này"
              value={yearDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setYearDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
