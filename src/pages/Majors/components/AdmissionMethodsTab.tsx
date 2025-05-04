import React from "react";

const AdmissionMethodsTab: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Phương thức Tuyển sinh</h2>
        <p className="text-gray-600 mt-1">Quản lý thông tin các phương thức tuyển sinh của trường</p>
      </div>
      
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3 className="text-lg font-medium text-gray-900">Chức năng đang phát triển</h3>
          <p className="mt-2 text-gray-500">Tính năng quản lý phương thức tuyển sinh sẽ sớm được cập nhật.</p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionMethodsTab;
