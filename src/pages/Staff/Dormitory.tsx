import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { FptButton } from '@/components/ui/FptButton';

const StaffDormitory: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Quản lý Ký túc xá</h2>
        <p className="text-lg text-gray-700 mb-6">
          Quản lý thông tin phòng ở và đăng ký ký túc xá cho sinh viên.
        </p>
        
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Tổng số phòng</h3>
            <p className="text-3xl font-bold text-blue-800">120</p>
            <p className="text-sm text-blue-600 mt-2">4 tòa nhà</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Phòng trống</h3>
            <p className="text-3xl font-bold text-green-800">32</p>
            <p className="text-sm text-green-600 mt-2">26.7% còn trống</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Sinh viên đang ở</h3>
            <p className="text-3xl font-bold text-orange-800">352</p>
            <p className="text-sm text-orange-600 mt-2">88 phòng đã sử dụng</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Đơn đăng ký mới</h3>
            <p className="text-3xl font-bold text-purple-800">15</p>
            <p className="text-sm text-purple-600 mt-2">Chờ xử lý</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button className="inline-block py-2 px-4 text-orange-600 border-b-2 border-orange-600 font-medium">
                Danh sách phòng
              </button>
            </li>
            <li className="mr-2">
              <button className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 font-medium">
                Đơn đăng ký
              </button>
            </li>
            <li className="mr-2">
              <button className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 font-medium">
                Danh sách sinh viên
              </button>
            </li>
          </ul>
        </div>
        
        {/* Phần nội dung chính - Danh sách phòng */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm phòng..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                <option value="">Tất cả tòa nhà</option>
                <option value="A">Tòa nhà A</option>
                <option value="B">Tòa nhà B</option>
                <option value="C">Tòa nhà C</option>
                <option value="D">Tòa nhà D</option>
              </select>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                <option value="">Tất cả trạng thái</option>
                <option value="empty">Còn trống</option>
                <option value="partial">Còn chỗ</option>
                <option value="full">Đã đầy</option>
                <option value="maintenance">Bảo trì</option>
              </select>
            </div>
            
            <FptButton variant="primary" size="md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm phòng mới
            </FptButton>
          </div>
          
          {/* Danh sách phòng dạng grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phòng 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Phòng A101</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Còn trống
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tòa nhà</p>
                    <p className="font-medium text-gray-800">Tòa A</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loại phòng</p>
                    <p className="font-medium text-gray-800">4 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đã đăng ký</p>
                    <p className="font-medium text-gray-800">0/4</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá/tháng</p>
                    <p className="font-medium text-gray-800">700,000 đ</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FptButton variant="outline" size="sm">Chi tiết</FptButton>
                  <FptButton variant="ghost" size="sm">Chỉnh sửa</FptButton>
                </div>
              </div>
            </div>
            
            {/* Phòng 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Phòng A102</h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Còn chỗ
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tòa nhà</p>
                    <p className="font-medium text-gray-800">Tòa A</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loại phòng</p>
                    <p className="font-medium text-gray-800">4 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đã đăng ký</p>
                    <p className="font-medium text-gray-800">2/4</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá/tháng</p>
                    <p className="font-medium text-gray-800">700,000 đ</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FptButton variant="outline" size="sm">Chi tiết</FptButton>
                  <FptButton variant="ghost" size="sm">Chỉnh sửa</FptButton>
                </div>
              </div>
            </div>
            
            {/* Phòng 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Phòng A103</h3>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Đã đầy
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tòa nhà</p>
                    <p className="font-medium text-gray-800">Tòa A</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loại phòng</p>
                    <p className="font-medium text-gray-800">4 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đã đăng ký</p>
                    <p className="font-medium text-gray-800">4/4</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá/tháng</p>
                    <p className="font-medium text-gray-800">700,000 đ</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FptButton variant="outline" size="sm">Chi tiết</FptButton>
                  <FptButton variant="ghost" size="sm">Chỉnh sửa</FptButton>
                </div>
              </div>
            </div>
            
            {/* Phòng 4 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Phòng B101</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                  Bảo trì
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tòa nhà</p>
                    <p className="font-medium text-gray-800">Tòa B</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loại phòng</p>
                    <p className="font-medium text-gray-800">2 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đã đăng ký</p>
                    <p className="font-medium text-gray-800">0/2</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá/tháng</p>
                    <p className="font-medium text-gray-800">900,000 đ</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FptButton variant="outline" size="sm">Chi tiết</FptButton>
                  <FptButton variant="ghost" size="sm">Chỉnh sửa</FptButton>
                </div>
              </div>
            </div>
            
            {/* Phòng 5 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Phòng B102</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Còn trống
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tòa nhà</p>
                    <p className="font-medium text-gray-800">Tòa B</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loại phòng</p>
                    <p className="font-medium text-gray-800">2 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đã đăng ký</p>
                    <p className="font-medium text-gray-800">0/2</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá/tháng</p>
                    <p className="font-medium text-gray-800">900,000 đ</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FptButton variant="outline" size="sm">Chi tiết</FptButton>
                  <FptButton variant="ghost" size="sm">Chỉnh sửa</FptButton>
                </div>
              </div>
            </div>
            
            {/* Phòng 6 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Phòng B103</h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Còn chỗ
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tòa nhà</p>
                    <p className="font-medium text-gray-800">Tòa B</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loại phòng</p>
                    <p className="font-medium text-gray-800">2 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đã đăng ký</p>
                    <p className="font-medium text-gray-800">1/2</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá/tháng</p>
                    <p className="font-medium text-gray-800">900,000 đ</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FptButton variant="outline" size="sm">Chi tiết</FptButton>
                  <FptButton variant="ghost" size="sm">Chỉnh sửa</FptButton>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phân trang */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Hiển thị 1-6 trên tổng số 120 phòng
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-400 cursor-not-allowed">
                Trước
              </button>
              <button className="px-3 py-1 rounded border border-orange-500 bg-orange-500 text-white">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                ...
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                20
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDormitory;
