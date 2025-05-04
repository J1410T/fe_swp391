import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";

interface AddAcademicYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (year: string) => Promise<void>;
  existingYears: string[];
}

export function AddAcademicYearModal({
  isOpen,
  onClose,
  onSuccess,
  existingYears,
}: AddAcademicYearModalProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Tạo danh sách năm từ năm hiện tại đến năm hiện tại + 5
  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const yearValue = String(currentYear + i);
    return yearValue;
  }).filter(y => !existingYears.includes(y));

  const handleSubmit = async () => {
    if (!year) {
      toast.error("Vui lòng chọn năm");
      return;
    }

    try {
      setLoading(true);
      // Mô phỏng API gọi để thêm năm tuyển sinh mới
      // Trong thực tế, bạn sẽ gọi API thực tế ở đây
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(`Đã thêm năm tuyển sinh ${year}`);
      await onSuccess(year);
      onClose();
      
      // Reset form
      setYear("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Không thể thêm năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm năm tuyển sinh</DialogTitle>
          <DialogDescription>
            Điền thông tin để thêm năm tuyển sinh mới
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="year">Năm tuyển sinh</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn năm" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.length > 0 ? (
                  yearOptions.map((y) => (
                    <SelectItem key={y} value={y}>
                      Năm {y}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-option" disabled>
                    Không có năm nào khả dụng
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả (không bắt buộc)</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả cho năm tuyển sinh này"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
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
            disabled={loading || !year || yearOptions.length === 0}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white"
          >
            {loading ? "Đang thêm..." : "Thêm năm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
