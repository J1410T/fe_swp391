import React from "react";
import { DashboardLayout } from "@/components/layout";
import DormitoryPage from "./DormitoryPage";
// import { FptButton } from "@/components/ui/FptButton";

const StaffScholarships: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">
          Quản lý Ký túc xá
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Quản lý thông tin phòng ở và đăng ký ký túc xá cho sinh viên.
        </p>
        <DormitoryPage />
      </div>
    </DashboardLayout>
  );
};

export default StaffScholarships;
