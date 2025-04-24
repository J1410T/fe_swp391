import { Major } from "@/types/entities/major";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as Dialog from "@radix-ui/react-dialog";

interface ViewMajorSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  major: Major | null;
}

/**
 * Sheet hiển thị chi tiết ngành học
 */
export function ViewMajorSheet({ isOpen, onOpenChange, major }: ViewMajorSheetProps) {
  if (!major) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-orange-400 bg-white overflow-hidden shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-y-auto max-h-[85vh]">

        <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 p-6 pb-4 rounded-t-xl">
          <Dialog.Title className="text-2xl font-bold text-center text-white overflow-hidden text-ellipsis max-w-[90%] mx-auto">
            Chi tiết ngành học
          </Dialog.Title>
          <Dialog.Description className="text-center text-white/90 mt-2 text-sm overflow-hidden text-ellipsis max-w-[90%] mx-auto">
            Thông tin chi tiết về ngành học
          </Dialog.Description>
          

        </div>
        
        <div className="px-8 py-6 space-y-6">
          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-orange-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Mã ngành</h4>
                <p className="font-semibold text-gray-800">{major.code}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-md font-semibold text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 mr-2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Tên ngành học
            </h3>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-gray-800 font-medium">{major.name}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-md font-semibold text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 mr-2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Mô tả ngành học
            </h3>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {major.description || "Chưa có mô tả chi tiết"}
              </p>
            </div>
          </div>
          
          {major.careers && major.careers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-md font-semibold text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 mr-2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Cơ hội nghề nghiệp
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {major.careers.map((career) => (
                    <Badge 
                      key={career.id} 
                      variant="outline" 
                      className="border-orange-200 bg-orange-50 text-orange-700 py-1 px-2 w-auto max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap inline-block"
                      title={career.name}
                    >
                      {career.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300 font-medium transition-colors">
                Đóng
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
