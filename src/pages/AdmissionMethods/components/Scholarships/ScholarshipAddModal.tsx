import { FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/api/base";
import { toast } from "sonner";

interface Campus {
  id: number;
  code: string;
  name: string;
}

interface Major {
  id: number;
  code: string;
  name: string;
}

interface ScholarshipAddModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  academicYear: string | number;
}

export function ScholarshipAddModal({
  isOpen,
  onOpenChange,
  onSubmit,
  loading,
  academicYear
}: ScholarshipAddModalProps) {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Fetch campuses and majors when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCampusesAndMajors();
    }
  }, [isOpen]);

  // Fetch campuses and majors
  const fetchCampusesAndMajors = async () => {
    setLoadingData(true);
    try {
      // Fetch campuses
      const campusesResponse = await api.get<{
        data: Campus[];
        success: boolean;
      }>('/campuses');

      if (campusesResponse.success) {
        setCampuses(campusesResponse.data);
      }

      // Fetch majors
      const majorsResponse = await api.get<{
        data: Major[];
        success: boolean;
      }>('/majors');

      if (majorsResponse.success) {
        setMajors(majorsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Không thể tải dữ liệu cơ sở và ngành học');
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm học bổng mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin học bổng cho năm học {academicYear}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Tên học bổng
              </label>
              <input
                id="name"
                name="name"
                className="col-span-3 p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="condition" className="text-right">
                Điều kiện
              </label>
              <input
                id="condition"
                name="condition"
                className="col-span-3 p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right">
                Số tiền
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0"
                step="1000000"
                className="col-span-3 p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                className="col-span-3 p-2 border rounded"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="campus_id" className="text-right">
                Cơ sở
              </label>
              <select
                id="campus_id"
                name="campus_id"
                className="col-span-3 p-2 border rounded"
                disabled={loadingData}
              >
                <option value="">-- Tất cả cơ sở --</option>
                {campuses.map(campus => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name} ({campus.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="major_id" className="text-right">
                Ngành học
              </label>
              <select
                id="major_id"
                name="major_id"
                className="col-span-3 p-2 border rounded"
                disabled={loadingData}
                required
              >
                <option value="">-- Chọn ngành học --</option>
                {majors.map(major => (
                  <option key={major.id} value={major.id}>
                    {major.name} ({major.code})
                  </option>
                ))}
              </select>
              <p className="col-span-4 text-xs text-red-500 text-right mt-1">
                * Bắt buộc chọn ngành học
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="application_url" className="text-right">
                URL đăng ký
              </label>
              <input
                id="application_url"
                name="application_url"
                type="url"
                className="col-span-3 p-2 border rounded"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || loadingData}>
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
