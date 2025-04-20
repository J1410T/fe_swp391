import React from 'react';
import { DashboardLayout } from '@/components/layout';

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Chào mừng Admin</h2>
        <p className="text-lg text-gray-700 mb-6">
          Đây là trang dành riêng cho người dùng có quyền Admin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Các thẻ thống kê */}
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Người dùng</h3>
            <p className="text-3xl font-bold text-blue-800">1,234</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Ứng dụng</h3>
            <p className="text-3xl font-bold text-green-800">56</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 shadow-sm border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Báo cáo</h3>
            <p className="text-3xl font-bold text-purple-800">89</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 py-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FPT University. Tất cả quyền được bảo lưu.
        </p>
      </footer>
    </DashboardLayout>
  );
};

export default AdminDashboard;
