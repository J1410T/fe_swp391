import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { dormitoriesApi } from "@/api/resources/dormitories";
import type { DormitoryResponse } from "@/types/entities/dormitory";
import { TriangleAlert } from "lucide-react";

interface DormitoryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: DormitoryResponse | null;
  campusId: number;
  onSubmitSuccess: () => void;
}

export const DormitoryForm: React.FC<DormitoryFormProps> = ({
  isOpen,
  onOpenChange,
  initialData = null,
  campusId,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: 0,
    campus_id: campusId,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || "",
        capacity: initialData.capacity || 0,
        campus_id: initialData.campus_id,
      });
    } else {
      // Reset form when adding new dormitory
      setFormData({
        name: "",
        description: "",
        capacity: 0,
        campus_id: campusId,
      });
    }
  }, [initialData, campusId]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên ký túc xá");
      return;
    }

    try {
      if (initialData) {
        // Update dormitory
        const cleanData = {
          name: formData.name,
          description: formData.description,
          capacity: formData.capacity,
          campus_id: formData.campus_id,
        };

        await dormitoriesApi.update(initialData.id, cleanData);
        toast.success("Cập nhật ký túc xá thành công");
      } else {
        // Create new dormitory
        await dormitoriesApi.create(formData);
        toast.success("Thêm ký túc xá thành công");
      }
      onSubmitSuccess();
      handleDialogOpenChange(false);
    } catch (error) {
      console.error("Lỗi khi xử lý:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  // Hàm xử lý khi đóng dialog
  const handleDialogOpenChange = (open: boolean) => {
    // Nếu dialog đóng lại và không có initialData (trường hợp thêm mới)
    if (!open && !initialData) {
      // Reset form về trạng thái ban đầu
      setFormData({
        name: "",
        description: "",
        capacity: 0,
        campus_id: campusId,
      });
    }
    // Gọi hàm onOpenChange từ props
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only" />
        <DialogDescription />
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Chỉnh sửa Ký túc xá" : "Thêm Ký túc xá Mới"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên ký túc xá *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              placeholder="Nhập tên ký túc xá"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Sức chứa
            </Label>
            <Input
              id="capacity"
              type="text" // Đổi từ number sang text để có thể xử lý chuỗi
              inputMode="numeric" // Vẫn hiển thị bàn phím số trên mobile
              pattern="[0-9]*" // Chỉ cho phép nhập số
              min="0"
              value={formData.capacity === 0 ? "" : formData.capacity} // Hiển thị rỗng thay vì 0
              onChange={(e) => {
                // Loại bỏ số 0 ở đầu và chuyển đổi thành số
                let inputValue = e.target.value;

                // Loại bỏ các ký tự không phải số
                inputValue = inputValue.replace(/[^0-9]/g, "");

                // Loại bỏ số 0 ở đầu
                if (inputValue.length > 1 && inputValue.startsWith("0")) {
                  inputValue = inputValue.replace(/^0+/, "");
                }

                // Chuyển đổi thành số
                const numValue = inputValue === "" ? 0 : parseInt(inputValue);

                handleChange("capacity", numValue);
              }}
              className="col-span-3"
              placeholder="Nhập sức chứa"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              placeholder="Nhập mô tả ký túc xá"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleDialogOpenChange(false)}
            aria-hidden="false"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
            aria-hidden="false"
          >
            {initialData ? "Lưu thay đổi" : "Thêm ký túc xá"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteDormitoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dormitoryName?: string;
}

export const DeleteDormitoryDialog: React.FC<DeleteDormitoryDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  dormitoryName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-xl shadow-2xl border-none">
        <DialogTitle className="sr-only">Xác nhận xóa ký túc xá</DialogTitle>
        <DialogDescription className="sr-only">
          Xác nhận xóa ký túc xá
        </DialogDescription>
        <div className="p-6 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <TriangleAlert className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Xác nhận xóa</h3>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-gray-700">
              Bạn có chắc chắn muốn xóa ký túc xá{" "}
              <span className="font-semibold text-red-600">
                "{dormitoryName}"
              </span>{" "}
              không?
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Hành động này không thể hoàn tác.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-100"
              aria-hidden="false"
            >
              Hủy
            </Button>
            <Button
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
              onClick={onConfirm}
              aria-hidden="false"
            >
              Xác nhận xóa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
