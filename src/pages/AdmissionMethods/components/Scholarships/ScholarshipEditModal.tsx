import { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScholarshipResponse } from "@/types/entities/scholarship";

interface ScholarshipEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  scholarship: ScholarshipResponse | null;
}

export function ScholarshipEditModal({
  isOpen,
  onOpenChange,
  onSubmit,
  loading,
  scholarship
}: ScholarshipEditModalProps) {
  if (!scholarship) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa học bổng</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin học bổng
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right">
                Tên học bổng
              </label>
              <input
                id="edit-name"
                name="name"
                defaultValue={scholarship.name}
                className="col-span-3 p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-condition" className="text-right">
                Điều kiện
              </label>
              <input
                id="edit-condition"
                name="condition"
                defaultValue={scholarship.condition}
                className="col-span-3 p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-amount" className="text-right">
                Số tiền
              </label>
              <input
                id="edit-amount"
                name="amount"
                type="number"
                min="0"
                step="1000000"
                defaultValue={scholarship.amount}
                className="col-span-3 p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-description" className="text-right">
                Mô tả
              </label>
              <textarea
                id="edit-description"
                name="description"
                defaultValue={scholarship.description}
                className="col-span-3 p-2 border rounded"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-application_url" className="text-right">
                URL đăng ký
              </label>
              <input
                id="edit-application_url"
                name="application_url"
                type="url"
                defaultValue={scholarship.application_url}
                className="col-span-3 p-2 border rounded"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
