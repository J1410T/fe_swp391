import React, { useState } from "react";
import { toast } from "sonner";
import { majorsApi } from "@/api/resources/majors";
import { Plus, CheckCircle2, AlertCircle, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Interface cho form values
interface CreateMajorFormValues {
  name: string;
  code: string;
  description: string;
}

interface CreateMajorFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

export const CreateMajorForm: React.FC<CreateMajorFormProps> = ({
  isOpen,
  onOpenChange,
  onCreated,
}) => {
  const [formValues, setFormValues] = useState<CreateMajorFormValues>({
    name: "",
    code: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Xử lý thay đổi giá trị form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Xác thực form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.name || formValues.name.length < 3) {
      newErrors.name = "Tên ngành học phải có ít nhất 3 ký tự";
    }
    if (!/^\d{7}$/.test(formValues.code)) {
      newErrors.code = "Mã ngành học phải là số và có đúng 7 chữ số";
    }
    if (!formValues.code) {
      newErrors.code = "Mã ngành học không được để trống";
    }
    
    if (!formValues.description || formValues.description.length < 10) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await majorsApi.create(formValues);

      if (response.success) {
        // Hiển thị thông báo thành công
        setNotification({
          type: "success",
          message: `Đã tạo ngành học ${formValues.name} thành công!`
        });
        toast.success(`Đã tạo ngành học ${formValues.name} thành công!`);
        
        // Đặt timeout để đóng dialog sau khi hiển thị thông báo
        setTimeout(() => {
          // Reset form
          setFormValues({ name: "", code: "", description: "" });
          onOpenChange(false);
          setNotification({ type: null, message: "" });
          
          // Callback sau khi tạo thành công
          if (onCreated) {
            onCreated();
          }
        }, 1500);
      } else {
        // Hiển thị thông báo lỗi
        setNotification({
          type: "error",
          message: response.message || "Có lỗi xảy ra khi tạo ngành học"
        });
        toast.error(response.message || "Có lỗi xảy ra khi tạo ngành học");
      }
    } catch (error) {
      console.error("Lỗi khi tạo ngành học:", error);
      // Hiển thị thông báo lỗi
      setNotification({
        type: "error",
        message: "Có lỗi xảy ra khi tạo ngành học"
      });
      toast.error("Có lỗi xảy ra khi tạo ngành học");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form khi dialog đóng
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormValues({ name: "", code: "", description: "" });
      setErrors({});
      setNotification({ type: null, message: "" });
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 border-l-4 border-orange-400 pl-3">
            Thêm ngành học mới
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Điền thông tin chi tiết để tạo ngành học mới
          </DialogDescription>
        </DialogHeader>

        {notification.type && (
          <Alert
            variant={notification.type === "success" ? "default" : "destructive"}
            className={`mb-4 ${notification.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <AlertTitle className={notification.type === "success" ? "text-green-800" : "text-red-800"}>
              {notification.type === "success" ? "Thành công" : "Lỗi"}
            </AlertTitle>
            <AlertDescription className={notification.type === "success" ? "text-green-700" : "text-red-700"}>
              {notification.message}
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1 opacity-70 hover:opacity-100"
              onClick={() => setNotification({ type: null, message: "" })}
            >
              <X className="h-3 w-3" />
            </Button>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="font-medium text-gray-700 block">
              Tên ngành học
            </label>
            <Input
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Ví dụ: Kỹ thuật phần mềm"
              className="focus-visible:ring-orange-200 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700 block">
              Mã ngành học
            </label>
            <Input
              name="code"
              value={formValues.code}
              onChange={handleChange}
              placeholder="Ví dụ: 7480103"
              className="focus-visible:ring-orange-200 w-full"
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700 block">
              Mô tả chi tiết
            </label>
            <Textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về ngành học..."
              className="min-h-[120px] focus-visible:ring-orange-200 w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <DialogFooter className="flex gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Đang tạo...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo ngành học
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
