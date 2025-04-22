import React from "react";
import { DashboardLayout } from "@/components/layout";
// import { FptButton } from "@/components/ui/FptButton";
import ScholarshipPage from "./ScholarshipPage";

const StaffScholarships: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">
          Quản lý Học bổng
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Quản lý thông tin học bổng và đơn đăng ký học bổng của sinh viên.
        </p>
        <ScholarshipPage />
      </div>
    </DashboardLayout>
  );
};

export default StaffScholarships;
