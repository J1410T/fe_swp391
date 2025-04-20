import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { FptButton } from '@/components/ui/FptButton';

const StaffScholarships: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Quản lý Học bổng</h2>
        <p className="text-lg text-gray-700 mb-6">
          Quản lý thông tin học bổng và đơn đăng ký học bổng của sinh viên.
        </p>
        
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Tổng học bổng</h3>
            <p className="text-3xl font-bold text-blue-800">12</p>
            <p className="text-sm text-blue-600 mt-2">Đang hoạt động</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Tổng ngân sách</h3>
            <p className="text-3xl font-bold text-green-800">2.5 tỷ</p>
            <p className="text-sm text-green-600 mt-2">VND</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Sinh viên nhận</h3>
            <p className="text-3xl font-bold text-orange-800">187</p>
            <p className="text-sm text-orange-600 mt-2">Học kỳ hiện tại</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Đơn đăng ký mới</h3>
            <p className="text-3xl font-bold text-purple-800">43</p>
            <p className="text-sm text-purple-600 mt-2">Chờ xử lý</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button className="inline-block py-2 px-4 text-orange-600 border-b-2 border-orange-600 font-medium">
                Danh sách học bổng
              </button>
            </li>
            <li className="mr-2">
              <button className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 font-medium">
                Đơn đăng ký
              </button>
            </li>
            <li className="mr-2">
              <button className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 font-medium">
                Sinh viên nhận học bổng
              </button>
            </li>
          </ul>
        </div>
        
        {/* Phần nội dung chính - Danh sách học bổng */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm học bổng..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                <option value="">Tất cả loại</option>
                <option value="merit">Học bổng thành tích</option>
                <option value="financial">Học bổng tài chính</option>
                <option value="talent">Học bổng tài năng</option>
                <option value="corporate">Học bổng doanh nghiệp</option>
              </select>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang mở</option>
                <option value="upcoming">Sắp mở</option>
                <option value="closed">Đã đóng</option>
              </select>
            </div>
            
            <FptButton variant="primary" size="md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm học bổng mới
            </FptButton>
          </div>
          
          {/* Bảng danh sách học bổng */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Mã học bổng</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Tên học bổng</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Loại</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Giá trị (VND)</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Số lượng</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Thời hạn</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Trạng thái</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Học bổng 1 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">HB001</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng Tài năng CNTT</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng tài năng</td>
                  <td className="py-3 px-4 text-gray-800">15,000,000</td>
                  <td className="py-3 px-4 text-gray-800">20</td>
                  <td className="py-3 px-4 text-gray-800">30/06/2024</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Đang mở
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Học bổng 2 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">HB002</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng Khó khăn vượt khó</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng tài chính</td>
                  <td className="py-3 px-4 text-gray-800">10,000,000</td>
                  <td className="py-3 px-4 text-gray-800">30</td>
                  <td className="py-3 px-4 text-gray-800">15/07/2024</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Đang mở
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Học bổng 3 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">HB003</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng FPT Software</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng doanh nghiệp</td>
                  <td className="py-3 px-4 text-gray-800">20,000,000</td>
                  <td className="py-3 px-4 text-gray-800">15</td>
                  <td className="py-3 px-4 text-gray-800">01/08/2024</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Sắp mở
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Học bổng 4 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">HB004</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng Thủ khoa đầu vào</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng thành tích</td>
                  <td className="py-3 px-4 text-gray-800">30,000,000</td>
                  <td className="py-3 px-4 text-gray-800">5</td>
                  <td className="py-3 px-4 text-gray-800">15/05/2024</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      Đã đóng
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Học bổng 5 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">HB005</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng Viettel</td>
                  <td className="py-3 px-4 text-gray-800">Học bổng doanh nghiệp</td>
                  <td className="py-3 px-4 text-gray-800">25,000,000</td>
                  <td className="py-3 px-4 text-gray-800">10</td>
                  <td className="py-3 px-4 text-gray-800">30/08/2024</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Sắp mở
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Phân trang */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Hiển thị 1-5 trên tổng số 12 học bổng
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
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffScholarships;
