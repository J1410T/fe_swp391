import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AdmissionMethodsHeaderProps {
  onAddNew: () => void;
}

export const AdmissionMethodsHeader: React.FC<AdmissionMethodsHeaderProps> = ({
  onAddNew
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Phương thức Tuyển sinh</h2>
        <p className="text-gray-600 mt-1">Quản lý thông tin các phương thức tuyển sinh của trường</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={onAddNew}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm phương thức
        </Button>
      </div>
    </div>
  );
};
