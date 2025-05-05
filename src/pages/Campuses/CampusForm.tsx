import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { campusesApi } from "@/api/resources/campuses"; // Import API
import type { CampusCreateData } from "@/types/entities/campus";

interface CampusFormProps {
  isOpen: boolean; // Trạng thái mở/đóng Dialog
  onOpenChange: (open: boolean) => void; // Hàm xử lý khi Dialog đóng/mở
  initialData?: CampusCreateData | null; // Dữ liệu ban đầu (nếu có)
  onSubmitSuccess: () => void; // Hàm gọi lại khi submit thành công
}

export const CampusForm: React.FC<CampusFormProps> = ({
  isOpen,
  onOpenChange,
  initialData = null,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<CampusCreateData>({
    name: "",
    code: "",
    address: "",
    description: "",
    contact: {
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.code) {
      toast.error("Vui lòng nhập tên và mã cơ sở");
      return;
    }

    try {
      if (initialData) {
        // Update campus
        if ("id" in initialData) {
          if (typeof initialData.id === "number") {
            await campusesApi.update(initialData.id, formData);
          } else {
            throw new Error("Invalid 'id' in initialData for update operation");
          }
        } else {
          throw new Error("Missing 'id' in initialData for update operation");
        }
        toast.success("Cập nhật cơ sở thành công");
      } else {
        // Create new campus
        await campusesApi.create(formData);
        toast.success("Thêm cơ sở thành công");
      }
      onSubmitSuccess(); // Gọi lại để làm mới danh sách
      onOpenChange(false); // Đóng dialog
    } catch (error) {
      console.error("Lỗi khi xử lý:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Chỉnh sửa Cơ sở" : "Thêm Cơ sở Mới"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên cơ sở *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              placeholder="Nhập tên cơ sở"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Mã cơ sở *
            </Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              className="col-span-3"
              placeholder="Nhập mã cơ sở"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Địa chỉ
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="col-span-3"
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Số điện thoại
            </Label>
            <Input
              id="phone"
              value={formData.contact.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              className="col-span-3"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData.contact.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              className="col-span-3"
              placeholder="Nhập email"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
          >
            {initialData ? "Lưu thay đổi" : "Thêm cơ sở"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  campusName?: string;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  campusName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed z-50 max-w-lg bg-white rounded-xl shadow-2xl border-none">
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Xác nhận xóa</h3>
          <p className="text-gray-600">
            Bạn có chắc chắn muốn xóa cơ sở "{campusName}" không? Hành động này
            không thể hoàn tác.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={onConfirm}
            >
              Xóa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
