import React from 'react';
import { DashboardLayout } from '@/components/layout';

const StaffAdmissions: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Tuyển sinh ngành</h2>
        <p className="text-lg text-gray-700 mb-6">
          Quản lý thông tin tuyển sinh theo ngành học.
        </p>
        
        {/* Phần nội dung chính */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm thí sinh..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                <option value="">Tất cả ngành</option>
                <option value="SE">Kỹ thuật phần mềm</option>
                <option value="AI">Trí tuệ nhân tạo</option>
                <option value="BA">Quản trị kinh doanh</option>
                <option value="GD">Thiết kế đồ họa</option>
              </select>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
            
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm hồ sơ
            </button>
          </div>
          
          {/* Bảng danh sách thí sinh */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Mã hồ sơ</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Họ tên</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Ngày sinh</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Ngành đăng ký</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Hình thức xét tuyển</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Trạng thái</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">TS0001</td>
                  <td className="py-3 px-4 text-gray-800">Nguyễn Văn A</td>
                  <td className="py-3 px-4 text-gray-800">01/01/2007</td>
                  <td className="py-3 px-4 text-gray-800">Kỹ thuật phần mềm</td>
                  <td className="py-3 px-4 text-gray-800">Xét học bạ</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Chờ xử lý
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
                      <button className="text-green-600 hover:text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">TS0002</td>
                  <td className="py-3 px-4 text-gray-800">Trần Thị B</td>
                  <td className="py-3 px-4 text-gray-800">15/05/2007</td>
                  <td className="py-3 px-4 text-gray-800">Trí tuệ nhân tạo</td>
                  <td className="py-3 px-4 text-gray-800">Xét điểm thi THPT</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Đã duyệt
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
                      <button className="text-orange-600 hover:text-orange-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">TS0003</td>
                  <td className="py-3 px-4 text-gray-800">Lê Văn C</td>
                  <td className="py-3 px-4 text-gray-800">22/08/2006</td>
                  <td className="py-3 px-4 text-gray-800">Quản trị kinh doanh</td>
                  <td className="py-3 px-4 text-gray-800">Xét học bạ</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Từ chối
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
                      <button className="text-orange-600 hover:text-orange-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
              Hiển thị 1-3 trên tổng số 25 mục
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

export default StaffAdmissions;
