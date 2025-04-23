import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Link2, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface AdmissionMethodFormProps {
  formData: {
    name: string;
    description: string;
    application_url: string;
  };
  loading: boolean;
  status: "idle" | "success" | "error";
  statusMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

/**
 * Form nhập liệu thông tin phương thức tuyển sinh
 */
export function AdmissionMethodForm({
  formData,
  loading,
  status,
  statusMessage,
  handleChange,
  handleSubmit,
  onCancel
}: AdmissionMethodFormProps): React.ReactElement {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
            onClick={onCancel}
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
  );
}
