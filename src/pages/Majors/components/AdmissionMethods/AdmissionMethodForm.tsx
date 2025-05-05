import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface AdmissionMethodFormData {
  name: string;
  description: string;
  application_url: string;
  evaluationType: string;
}

interface AdmissionMethodFormProps {
  formData: AdmissionMethodFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  submitLabel: string;
}

export const AdmissionMethodForm: React.FC<AdmissionMethodFormProps> = ({
  formData,
  onInputChange,
  onSelectChange,
  onCancel,
  onSubmit,
  isLoading,
  submitLabel
}) => {
  return (
    <>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên phương thức</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={onInputChange}
            placeholder="Nhập tên phương thức tuyển sinh"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={onInputChange}
            placeholder="Mô tả chi tiết về phương thức tuyển sinh"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="application_url">URL đăng ký</Label>
          <Input
            id="application_url"
            value={formData.application_url}
            onChange={onInputChange}
            placeholder="https://example.com/apply"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="evaluationType">Loại đánh giá</Label>
          <Select value={formData.evaluationType} onValueChange={onSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại đánh giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HOCBA">Xét học bạ THPT</SelectItem>
              <SelectItem value="THPTQG">Kết quả thi THPT Quốc gia</SelectItem>
              <SelectItem value="DGNL">Kỳ thi đánh giá năng lực</SelectItem>
              <SelectItem value="XTTD">Xét tuyển thẳng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white rounded-full border-t-transparent"></div>
              Đang lưu...
            </>
          ) : submitLabel}
        </Button>
      </DialogFooter>
    </>
  );
};
