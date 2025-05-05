import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface AdmissionMethodsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
}

export const AdmissionMethodsSearch: React.FC<AdmissionMethodsSearchProps> = ({
  searchTerm,
  onSearchChange,
  resultsCount
}) => {
  return (
    <div className="mb-6 flex items-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm phương thức tuyển sinh..."
          className="pl-10 pr-10 border-gray-300 focus-visible:ring-orange-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="ml-4 text-sm text-gray-500">
        {resultsCount} phương thức
      </div>
    </div>
  );
};
