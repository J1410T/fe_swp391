import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { FptButton } from '@/components/ui/FptButton';

const StaffDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-orange-600 mb-2">Chào mừng, Nguyễn Văn A</h2>
            <p className="text-lg text-gray-700">
              Tổng quan hệ thống tuyển sinh và quản lý sinh viên
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Học kỳ: Fall 2024</span>
          </div>
        </div>
        
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 flex items-center">
            <div className="rounded-full bg-blue-500 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-1">Thí sinh mới</h3>
              <p className="text-3xl font-bold text-blue-800">128</p>
              <p className="text-sm text-blue-600 mt-1">+12% so với tuần trước</p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-100 flex items-center">
            <div className="rounded-full bg-green-500 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-1">Đã duyệt</h3>
              <p className="text-3xl font-bold text-green-800">96</p>
              <p className="text-sm text-green-600 mt-1">75% tỷ lệ duyệt</p>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100 flex items-center">
            <div className="rounded-full bg-orange-500 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-700 mb-1">Chờ xử lý</h3>
              <p className="text-3xl font-bold text-orange-800">32</p>
              <p className="text-sm text-orange-600 mt-1">Cần xử lý trong 48h</p>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100 flex items-center">
            <div className="rounded-full bg-purple-500 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-1">Nhiệm vụ</h3>
              <p className="text-3xl font-bold text-purple-800">15</p>
              <p className="text-sm text-purple-600 mt-1">5 nhiệm vụ cần hoàn thành</p>
            </div>
          </div>
        </div>
        
        {/* Nội dung chính */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Cột 1: Hoạt động gần đây */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Hoạt động gần đây</h3>
                <FptButton variant="outline" size="sm">Xem tất cả</FptButton>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">Duyệt hồ sơ tuyển sinh</h4>
                    <p className="text-sm text-gray-600 mt-1">Bạn đã duyệt hồ sơ của Trần Thị B cho ngành Trí tuệ nhân tạo</p>
                    <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">Cập nhật thông tin phòng ký túc xá</h4>
                    <p className="text-sm text-gray-600 mt-1">Bạn đã cập nhật thông tin cho phòng A101 và A102</p>
                    <p className="text-xs text-gray-500 mt-1">Hôm qua, 15:30</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">Yêu cầu bổ sung hồ sơ</h4>
                    <p className="text-sm text-gray-600 mt-1">Bạn đã gửi yêu cầu bổ sung hồ sơ cho Nguyễn Văn C</p>
                    <p className="text-xs text-gray-500 mt-1">Hôm qua, 10:15</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">Thêm học bổng mới</h4>
                    <p className="text-sm text-gray-600 mt-1">Bạn đã thêm học bổng "Tài năng CNTT" với giá trị 15 triệu đồng</p>
                    <p className="text-xs text-gray-500 mt-1">2 ngày trước</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cột 2: Nhiệm vụ cần làm và Thông báo */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nhiệm vụ cần làm</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                  <label className="ml-2 text-sm text-gray-700">Duyệt 5 hồ sơ tuyển sinh mới</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                  <label className="ml-2 text-sm text-gray-700">Cập nhật thông tin học bổng Fall 2024</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                  <label className="ml-2 text-sm text-gray-700">Kiểm tra phòng ký túc xá tòa B</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                  <label className="ml-2 text-sm text-gray-700">Gửi email thông báo kết quả học bổng</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                  <label className="ml-2 text-sm text-gray-700">Chuẩn bị báo cáo tuyển sinh tháng 6</label>
                </div>
              </div>
              <FptButton variant="outline" size="sm" className="mt-4 w-full">Thêm nhiệm vụ</FptButton>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Thông báo</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">5 mới</span>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-sm font-medium text-gray-800">Cập nhật quy trình tuyển sinh</p>
                  <p className="text-xs text-gray-500 mt-1">1 giờ trước</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-sm font-medium text-gray-800">Họp giao ban tuần - 9:00 AM thứ Hai</p>
                  <p className="text-xs text-gray-500 mt-1">3 giờ trước</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-sm font-medium text-gray-800">Deadline nộp báo cáo tháng</p>
                  <p className="text-xs text-gray-500 mt-1">Hôm qua</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-sm font-medium text-gray-800">Thông báo bảo trì hệ thống</p>
                  <p className="text-xs text-gray-500 mt-1">2 ngày trước</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Cập nhật chính sách học bổng mới</p>
                  <p className="text-xs text-gray-500 mt-1">3 ngày trước</p>
                </div>
              </div>
              <FptButton variant="outline" size="sm" className="mt-4 w-full">Xem tất cả</FptButton>
            </div>
          </div>
        </div>
        
        {/* Phần thống kê theo ngành */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Thống kê tuyển sinh theo ngành</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Ngành</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Chỉ tiêu</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Đã nộp</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Đã duyệt</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Tỷ lệ</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">Kỹ thuật phần mềm</td>
                  <td className="py-3 px-4 text-gray-800">120</td>
                  <td className="py-3 px-4 text-gray-800">98</td>
                  <td className="py-3 px-4 text-gray-800">76</td>
                  <td className="py-3 px-4 text-gray-800">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '63%' }}></div>
                    </div>
                    <span className="text-xs text-gray-600">63%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Đang tuyển</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">Trí tuệ nhân tạo</td>
                  <td className="py-3 px-4 text-gray-800">80</td>
                  <td className="py-3 px-4 text-gray-800">92</td>
                  <td className="py-3 px-4 text-gray-800">65</td>
                  <td className="py-3 px-4 text-gray-800">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                    <span className="text-xs text-gray-600">81%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Sắp đầy</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">Quản trị kinh doanh</td>
                  <td className="py-3 px-4 text-gray-800">100</td>
                  <td className="py-3 px-4 text-gray-800">45</td>
                  <td className="py-3 px-4 text-gray-800">32</td>
                  <td className="py-3 px-4 text-gray-800">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                    <span className="text-xs text-gray-600">32%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Còn nhiều</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">Thiết kế đồ họa</td>
                  <td className="py-3 px-4 text-gray-800">60</td>
                  <td className="py-3 px-4 text-gray-800">72</td>
                  <td className="py-3 px-4 text-gray-800">58</td>
                  <td className="py-3 px-4 text-gray-800">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                    <span className="text-xs text-gray-600">97%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Gần đầy</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">Marketing số</td>
                  <td className="py-3 px-4 text-gray-800">70</td>
                  <td className="py-3 px-4 text-gray-800">38</td>
                  <td className="py-3 px-4 text-gray-800">25</td>
                  <td className="py-3 px-4 text-gray-800">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '36%' }}></div>
                    </div>
                    <span className="text-xs text-gray-600">36%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Còn nhiều</span>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default StaffDashboard;
