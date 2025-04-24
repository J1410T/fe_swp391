import { Major } from "@/types/entities/major";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

interface EditMajorSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  major: Major | null;
  onSave: (majorId: string, formData: { name: string; code: string; description: string }) => void;
}

/**
 * Sheet chỉnh sửa thông tin ngành học
 */
export function EditMajorSheet({ isOpen, onOpenChange, major, onSave }: EditMajorSheetProps) {
  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    description: string;
  }>({ name: "", code: "", description: "" });

  // Cập nhật form data khi major thay đổi
  useEffect(() => {
    if (major) {
      setFormData({
        name: major.name,
        code: major.code,
        description: major.description || ""
      });
    }
  }, [major]);

  if (!major) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    onSave(major.id.toString(), formData);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-orange-400 bg-white overflow-hidden shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-y-auto max-h-[85vh] mx-auto">

        <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 p-6 pb-4 rounded-t-xl">
          <Dialog.Title className="text-2xl font-bold text-center text-white overflow-hidden text-ellipsis max-w-[90%] mx-auto">
            Chỉnh sửa ngành học
          </Dialog.Title>
          <Dialog.Description className="text-center text-white/90 mt-2 text-sm overflow-hidden text-ellipsis max-w-[90%] mx-auto">
            Cập nhật thông tin ngành học
          </Dialog.Description>
          

        </div>
        
        <form className="flex flex-col w-full">
          <div className="px-8 py-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-left flex items-center text-gray-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-orange-500">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Tên ngành học
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên ngành học"
                className="border border-gray-300 focus-visible:border-orange-400 focus-visible:ring-orange-200 transition-colors duration-200 shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code" className="text-left flex items-center text-gray-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-orange-500">
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                </svg>
                Mã ngành
              </Label>
              <Input
                id="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Nhập mã ngành học"
                className="border border-gray-300 focus-visible:border-orange-400 focus-visible:ring-orange-200 transition-colors duration-200 shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-left flex items-center text-gray-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-orange-500">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Mô tả ngành học
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả chi tiết về ngành học"
                className="min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-orange-400 focus-visible:ring-orange-200 focus-visible:ring-[2px] transition-colors duration-200 resize-none"
                required
              />
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end space-x-3 w-full">
              <Dialog.Close asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300 font-medium transition-colors"
                >
                  Hủy
                </Button>
              </Dialog.Close>
              <Button 
                type="button"
                onClick={handleSave} 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </form>
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
