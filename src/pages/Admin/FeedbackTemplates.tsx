import React from 'react';
import { DashboardLayout } from '@/components/layout';

const FeedbackTemplates: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Mẫu phản hồi</h2>
        <p className="text-lg text-gray-700 mb-6">
          Quản lý các mẫu phản hồi cho thí sinh và phụ huynh.
        </p>
        
        {/* Phần nội dung chính */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm mẫu phản hồi..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm mẫu phản hồi
            </button>
          </div>
          
          {/* Danh sách mẫu phản hồi */}
          <div className="grid grid-cols-1 gap-6">
            {/* Mẫu phản hồi 1 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Thông báo trúng tuyển</h3>
                  <p className="text-sm text-gray-500 mt-1">Cập nhật: 15/04/2025</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  Kính gửi {'{Họ tên thí sinh}'}, <br /><br />
                  
                  Trường Đại học FPT trân trọng thông báo bạn đã trúng tuyển vào ngành {'{Tên ngành}'} theo hình thức xét tuyển {'{Hình thức xét tuyển}'}. <br /><br />
                  
                  Để xác nhận nhập học, vui lòng hoàn thành các thủ tục sau đây trước ngày {'{Hạn chót}'}:<br />
                  1. Nộp bản sao công chứng Bằng tốt nghiệp THPT hoặc Giấy chứng nhận tốt nghiệp tạm thời<br />
                  2. Nộp học phí học kỳ đầu tiên<br />
                  3. Hoàn thành hồ sơ nhập học trực tuyến<br /><br />
                  
                  Mọi thắc mắc vui lòng liên hệ Phòng Tuyển sinh theo số điện thoại: 024.7300.1866<br /><br />
                  
                  Trân trọng,<br />
                  Phòng Tuyển sinh - Trường Đại học FPT
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Đang sử dụng
                </span>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  Xem trước
                </button>
              </div>
            </div>
            
            {/* Mẫu phản hồi 2 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Thông báo học bổng</h3>
                  <p className="text-sm text-gray-500 mt-1">Cập nhật: 10/04/2025</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  Kính gửi {'{Họ tên thí sinh}'}, <br /><br />
                  
                  Trường Đại học FPT trân trọng thông báo bạn đã được nhận học bổng {'{Tên học bổng}'} với giá trị {'{Giá trị học bổng}'}. <br /><br />
                  
                  Học bổng này được cấp dựa trên thành tích xuất sắc của bạn trong {'{Lý do cấp học bổng}'}. <br /><br />
                  
                  Để nhận học bổng, vui lòng hoàn thành thủ tục nhập học trước ngày {'{Hạn chót}'} và liên hệ Phòng Công tác Sinh viên để được hướng dẫn chi tiết. <br /><br />
                  
                  Mọi thắc mắc vui lòng liên hệ Phòng Tuyển sinh theo số điện thoại: 024.7300.1866<br /><br />
                  
                  Trân trọng,<br />
                  Phòng Tuyển sinh - Trường Đại học FPT
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Đang sử dụng
                </span>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  Xem trước
                </button>
              </div>
            </div>
            
            {/* Mẫu phản hồi 3 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Thông báo lịch phỏng vấn</h3>
                  <p className="text-sm text-gray-500 mt-1">Cập nhật: 05/04/2025</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  Kính gửi {'{Họ tên thí sinh}'}, <br /><br />
                  
                  Trường Đại học FPT trân trọng thông báo lịch phỏng vấn xét tuyển của bạn như sau: <br /><br />
                  
                  - Thời gian: {'{Giờ}'} ngày {'{Ngày phỏng vấn}'}<br />
                  - Địa điểm: {'{Địa điểm phỏng vấn}'}<br />
                  - Hình thức: {'{Hình thức phỏng vấn}'}<br /><br />
                  
                  Vui lòng chuẩn bị các giấy tờ sau:<br />
                  1. CMND/CCCD bản gốc<br />
                  2. Học bạ THPT (bản gốc)<br />
                  3. Các chứng chỉ, giấy khen (nếu có)<br /><br />
                  
                  Mọi thắc mắc vui lòng liên hệ Phòng Tuyển sinh theo số điện thoại: 024.7300.1866<br /><br />
                  
                  Trân trọng,<br />
                  Phòng Tuyển sinh - Trường Đại học FPT
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Đang sử dụng
                </span>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  Xem trước
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackTemplates;
