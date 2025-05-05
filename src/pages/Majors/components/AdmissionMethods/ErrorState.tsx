import React from "react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-red-400 mb-4">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3 className="text-lg font-medium text-gray-900">{error}</h3>
        <p className="mt-2 text-gray-500">Vui lòng thử lại sau hoặc liên hệ quản trị viên.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={onRetry}
        >
          Thử lại
        </Button>
      </div>
    </div>
  );
};
