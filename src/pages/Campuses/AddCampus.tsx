import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { campusesApi } from "@/api/resources/campuses";
import type { CampusCreateData } from "@/types/entities/campus";
import { toast } from "sonner";

interface AddCampusProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCampusAdded: () => void;
}

export const AddCampus: React.FC<AddCampusProps> = ({
  isOpen,
  onOpenChange,
  onCampusAdded,
}) => {
  const [newCampus, setNewCampus] = useState<CampusCreateData>({
    name: "",
    code: "",
    address: "",
    description: "",
  });

  const handleAddCampus = async () => {
    try {
      // Validate input
      if (!newCampus.name || !newCampus.code) {
        toast.error("Vui lòng nhập tên và mã cơ sở");
        return;
      }

      const response = await campusesApi.create(newCampus);
      if (response.data) {
        toast.success("Thêm cơ sở thành công");
        // Reset form
        setNewCampus({
          name: "",
          code: "",
          address: "",
          description: "",
        });
        // Thông báo để làm mới danh sách
        onCampusAdded();
        // Đóng dialog
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Lỗi thêm cơ sở:", error);
      toast.error("Không thể thêm cơ sở. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm Cơ sở Mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin chi tiết cho cơ sở đào tạo mới
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên cơ sở *
            </Label>
            <Input
              id="name"
              value={newCampus.name}
              onChange={(e) =>
                setNewCampus({ ...newCampus, name: e.target.value })
              }
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
              value={newCampus.code}
              onChange={(e) =>
                setNewCampus({ ...newCampus, code: e.target.value })
              }
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
              value={newCampus.address}
              onChange={(e) =>
                setNewCampus({ ...newCampus, address: e.target.value })
              }
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
              value={newCampus.description}
              onChange={(e) =>
                setNewCampus({ ...newCampus, description: e.target.value })
              }
              className="col-span-3"
              placeholder="Nhập mô tả"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleAddCampus}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
          >
            Thêm cơ sở
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
