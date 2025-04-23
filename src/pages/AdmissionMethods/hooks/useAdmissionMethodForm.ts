import { useState, useEffect } from "react";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { toast } from "sonner";
import type { AdmissionMethod } from "@/types";

interface UseAdmissionMethodFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

/**
 * Custom hook quản lý logic của form thêm phương thức tuyển sinh
 */
export function useAdmissionMethodForm({ onSuccess, onClose }: UseAdmissionMethodFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    application_url: "",
  });
  const [nextId, setNextId] = useState<number | null>(null);
  const [addedMethod, setAddedMethod] = useState<AdmissionMethod | null>(null);

  /**
   * Hàm lấy ID tiếp theo cho phương thức tuyển sinh mới
   * Lấy danh sách phương thức tuyển sinh hiện có, tìm ID lớn nhất và trả về ID + 1
   */
  const getNextId = async (): Promise<number> => {
    try {
      // Lấy danh sách tất cả phương thức tuyển sinh
      const response = await admissionMethodsApi.getAll();
      
      if (response.success && response.data && response.data.length > 0) {
        // Tìm ID lớn nhất trong danh sách
        const maxId = Math.max(...response.data.map(method => method.id));
        // Trả về ID tiếp theo (ID lớn nhất + 1)
        return maxId + 1;
      }
      
      // Nếu không có phương thức tuyển sinh nào, trả về ID mặc định là 1
      return 1;
    } catch (error) {
      console.error("Lỗi khi lấy ID tiếp theo:", error);
      // Trả về ID mặc định là 1 nếu có lỗi
      return 1;
    }
  };

  /**
   * Xử lý thay đổi giá trị trong form
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Xử lý submit form
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu
    if (!formData.name || !formData.description || !formData.application_url) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      setStatus("error");
      setStatusMessage("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    try {
      setLoading(true);
      setStatus("idle");
      
      // Đảm bảo luôn lấy ID mới nhất trước khi gửi request
      // Thay vì kiểm tra nextId === null, luôn lấy ID mới nhất
      const id = await getNextId();
      
      // Tạo dữ liệu với ID tăng dần
      const admissionMethodData = {
        ...formData,
        id: id // Sử dụng ID mới lấy được
      };
      
      // Gọi API tạo phương thức tuyển sinh mới với ID tăng dần
      const response = await admissionMethodsApi.create(admissionMethodData);
      
      // Cập nhật nextId sau khi gọi API thành công
      setNextId(id + 1);
      
      if (response.success) {
        toast.success("Thêm phương thức tuyển sinh thành công");
        setFormData({
          name: "",
          description: "",
          application_url: "",
        });
        // nextId đã được cập nhật ở trên
        setStatus("success");
        setStatusMessage("Thêm phương thức tuyển sinh thành công");
        
        // Lưu thông tin phương thức tuyển sinh đã thêm
        setAddedMethod(response.data);
        
        // Hiển thị màn hình thành công
        setShowSuccessScreen(true);
        
        // Bắt đầu đếm ngược thời gian
        let count = 3;
        setCountdown(count);
        
        const timer = setInterval(() => {
          count -= 1;
          setCountdown(count);
          
          if (count <= 0) {
            clearInterval(timer);
            onClose();
            setStatus("idle");
            setShowSuccessScreen(false);
            onSuccess(); // Gọi callback để cập nhật danh sách
          }
        }, 1000);
      } else {
        toast.error(response.message || "Thêm phương thức tuyển sinh thất bại");
        setStatus("error");
        setStatusMessage(response.message || "Thêm phương thức tuyển sinh thất bại");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi khi thêm phương thức tuyển sinh";
      toast.error(errorMessage);
      setStatus("error");
      setStatusMessage(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xử lý khi người dùng nhấn nút tiếp tục trên màn hình thành công
   */
  const handleContinue = () => {
    onClose();
    setShowSuccessScreen(false);
    onSuccess();
  };

  /**
   * Reset form khi đóng dialog
   */
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      application_url: "",
    });
    setStatus("idle");
    setStatusMessage("");
    setShowSuccessScreen(false);
  };

  return {
    formData,
    loading,
    status,
    statusMessage,
    showSuccessScreen,
    countdown,
    addedMethod,
    nextId,
    handleChange,
    handleSubmit,
    handleContinue,
    resetForm,
    getNextId,
    setNextId
  };
}
