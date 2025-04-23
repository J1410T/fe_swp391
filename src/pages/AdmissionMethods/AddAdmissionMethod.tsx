import { useState } from "react";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { PlusCircle, BookOpen, Link2, FileText, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";

/**
 * Component thêm phương thức tuyển sinh mới
 * @param onSuccess Callback khi thêm thành công
 */
export function AddAdmissionMethod({
  onSuccess,
}: {
  onSuccess: () => void;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    application_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      
      // Gọi API tạo phương thức tuyển sinh mới
      const response = await admissionMethodsApi.create(formData);
      
      if (response.success) {
        toast.success("Thêm phương thức tuyển sinh thành công");
        setFormData({
          name: "",
          description: "",
          application_url: "",
        });
        setStatus("success");
        setStatusMessage("Thêm phương thức tuyển sinh thành công");
        
        // Tự động đóng form sau 2 giây khi thành công
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
          onSuccess(); // Gọi callback để cập nhật danh sách
        }, 2000);
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

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 transition-colors duration-300 shadow-md hover:shadow-lg rounded-lg font-medium">
          <PlusCircle className="mr-2 h-5 w-5" />
          Thêm phương thức tuyển sinh
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-orange-400 bg-white overflow-hidden shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 p-6 pb-4 rounded-t-xl">
              <Dialog.Title className="text-2xl whitespace-nowrap font-bold text-center text-white overflow-hidden text-ellipsis max-w-[90%] mx-auto">
                Thêm phương thức tuyển sinh mới
              </Dialog.Title>
              <Dialog.Description className="text-center text-white/90 mt-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%] mx-auto">
                Điền thông tin phương thức tuyển sinh mới vào form dưới đây
              </Dialog.Description>
              
              <Dialog.Close asChild>
                <button 
                  type="button"
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/80"
                  aria-label="Đóng"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </Dialog.Close>
            </div>
          
          {/* Thông báo trạng thái */}
          {status !== "idle" && (
            <div className={`mx-6 mt-4 p-3 rounded-lg flex items-center ${status === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {status === "success" ? (
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0" />
              )}
              <span className="text-sm font-medium truncate">{statusMessage}</span>
            </div>
          )}
          
          <div className="px-8 py-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-left flex items-center text-gray-700 font-medium">
                <FileText className="mr-2 h-4 w-4 text-orange-500" />
                Tên phương thức
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên phương thức tuyển sinh"
                className="border border-gray-300 focus-visible:border-orange-400 focus-visible:ring-orange-200 transition-colors duration-200 shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-left flex items-center text-gray-700 font-medium">
                <BookOpen className="mr-2 h-4 w-4 text-orange-500" />
                Mô tả
              </Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả chi tiết về phương thức tuyển sinh"
                className="min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-orange-400 focus-visible:ring-orange-200 focus-visible:ring-[2px] transition-colors duration-200 resize-none"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="application_url" className="text-left flex items-center text-gray-700 font-medium">
                <Link2 className="mr-2 h-4 w-4 text-orange-500" />
                URL đăng ký
              </Label>
              <Input
                id="application_url"
                name="application_url"
                value={formData.application_url}
                onChange={handleChange}
                placeholder="Nhập URL đăng ký (ví dụ: https://example.com/apply)"
                className="border border-gray-300 focus-visible:border-orange-400 focus-visible:ring-orange-200 transition-colors duration-200 shadow-sm"
                required
                type="url"
              />
            </div>
          </div>
          
            <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end space-x-3 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300 font-medium transition-colors"
                >
                  Hủy
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Thêm mới
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
