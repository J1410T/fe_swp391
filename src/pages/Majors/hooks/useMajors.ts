import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { MajorsLoaderResponse } from "@/types/loaders/major";
import type { PaginatedResponse } from "@/types/api";
import { Major } from "@/types/entities/major";
import { PaginationParams } from "@/types";
import { toast } from "sonner";
import { majorsApi } from "@/api/resources/majors";

/**
 * Hook quản lý logic của trang Majors
 */
export function useMajors() {
  const loaderData = useLoaderData<MajorsLoaderResponse>();
  const navigate = useNavigate();
  
  // Mặc định dữ liệu trống nếu không có dữ liệu từ loader
  const defaultData: PaginatedResponse<Major> = {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  };
  
  // State
  const [majorsData, setMajorsData] = useState<PaginatedResponse<Major>>(defaultData);
  const [pagination, setPagination] = useState<PaginationParams>({ 
    page: 1, 
    limit: 10 
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewSheetOpen, setViewSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  
  // Xử lý dữ liệu từ loader
  useEffect(() => {
    try {
      // Kiểm tra nếu có dữ liệu hợp lệ
      if (loaderData && loaderData.status === 'success' && loaderData.data) {
        setMajorsData(loaderData.data);
        setPagination({ 
          page: loaderData.data.page || 1, 
          limit: loaderData.data.limit || 10 
        });
      }
    } catch (error) {
      console.error("Lỗi khi xử lý dữ liệu:", error);
    }
  }, [loaderData]);

  // Xử lý xem chi tiết ngành học
  const handleView = (major: Major) => {
    setSelectedMajor(major);
    setViewSheetOpen(true);
  };

  // Xử lý chỉnh sửa ngành học
  const handleEdit = (major: Major) => {
    setSelectedMajor(major);
    setEditSheetOpen(true);
  };

  // Xử lý xóa ngành học
  const handleDelete = (major: Major) => {
    // Trong thực tế, sẽ gọi API để xóa ngành học
    
    // Giả lập xóa thành công
    toast.success(`Đã xóa ngành học ${major.name} thành công!`);
    
    // Cập nhật lại danh sách sau khi xóa
    // Trong thực tế, có thể reload data hoặc cập nhật state
    // navigate(0);
  };

  // Xử lý tìm kiếm
  const handleSearch = async (params: { code?: string; name?: string }) => {
    // Lưu query để hiển thị trong UI
    setSearchQuery(params.name || params.code || "");
    setPagination({ ...pagination, page: 1 }); // Reset về trang 1 khi tìm kiếm
    
    try {
      // Xử lý trường hợp tìm kiếm theo mã ngành cụ thể (số nguyên)
      if (params.code && !params.name) {
        const majorId = parseInt(params.code);
        if (!isNaN(majorId)) {
          try {
            // Thử gọi API getById nếu là số nguyên
            const detailResponse = await majorsApi.getById(majorId);
            if (detailResponse.success && detailResponse.data) {
              // Nếu tìm thấy ngành học theo ID
              handleFilterByMajor(detailResponse.data);
              toast.success(`Đã tìm thấy ngành học: ${detailResponse.data.name}`);
              return;
            }
          } catch (error) {
            console.error("Lỗi khi tìm kiếm ngành học theo ID:", error);
            // Nếu không tìm thấy theo ID, tiếp tục tìm theo code
          }
        }
      }
      
      // Xử lý tìm kiếm thông thường
      let apiParams: any = {};
      
      // Phân tách xử lý tìm kiếm theo mã và theo tên để tránh xung đột
      if (params.name && params.name.trim() !== "") {
        // Chỉ dùng tham số name cho tìm kiếm theo tên - KHÔNG dùng phân trang
        apiParams = { name: params.name };
      } 
      else if (params.code && params.code.trim() !== "") {
        // Khi tìm theo code, không sử dụng phân trang vì API không chấp nhận
        apiParams = { code: params.code };
      }
      else {
        // Nếu không có tiêu chí tìm kiếm, lấy danh sách không có phân trang
        apiParams = {};
      }
      
      // Gọi API để tìm kiếm
      const response = await majorsApi.getAll(apiParams);
      
      if (response.success) {
        // Xử lý dữ liệu trả về tùy theo loại tìm kiếm
        if (Array.isArray(response.data)) {
          // Tạo cấu trúc dữ liệu phân trang từ mảng kết quả
          const paginatedData: PaginatedResponse<Major> = {
            items: response.data,
            total: response.data.length,
            page: 1,
            limit: pagination.limit,
            totalPages: Math.ceil(response.data.length / pagination.limit)
          };
          setMajorsData(paginatedData);
          
          // Hiển thị thông báo tùy theo kết quả
          if (response.data.length === 0) {
            toast.error("Không tìm thấy ngành học nào phù hợp");
          } else if ((params.code && params.code.trim() !== "") || (params.name && params.name.trim() !== "")) {
            toast.success(`Đã tìm thấy ${response.data.length} ngành học`);
          } else {
            toast.success(`Đã tải ${response.data.length} ngành học`);
          }
        } else if (response.data && typeof response.data === 'object') {
          // Nếu dữ liệu đã có cấu trúc phân trang
          setMajorsData(response.data as PaginatedResponse<Major>);
          
          // Hiển thị thông báo tùy theo kết quả
          if ((response.data as PaginatedResponse<Major>).items.length === 0) {
            toast.error("Không tìm thấy ngành học nào phù hợp");
          } else if ((params.code && params.code.trim() !== "") || (params.name && params.name.trim() !== "")) {
            toast.success(`Đã tìm thấy ${(response.data as PaginatedResponse<Major>).items.length} ngành học`);
          }
        } else {
          // Trường hợp không có dữ liệu
          setMajorsData({
            items: [],
            total: 0,
            page: 1,
            limit: pagination.limit,
            totalPages: 0
          });
          toast.error("Không tìm thấy ngành học nào phù hợp");
        }
      } else {
        toast.error(response.message || "Không tìm thấy ngành học nào phù hợp");
      }
    } catch (error: any) {
      console.error("Lỗi khi tìm kiếm ngành học:", error);
      
      // Xử lý lỗi 400 - Validation error
      if (error.message && error.message.includes('400')) {
        // Hiển thị thông báo lỗi cụ thể hơn
        toast.error(
          `Tìm kiếm không hợp lệ: ${params.code ? `"${params.code}"` : ''} ${params.name ? `"${params.name}"` : ''}. Hãy thử tìm kiếm theo tên ngành học.`
        );
        
        // Đặt lại dữ liệu về trạng thái trống
        setMajorsData({
          items: [],
          total: 0,
          page: 1,
          limit: pagination.limit,
          totalPages: 0
        });
      } else {
        // Lỗi khác
        toast.error("Có lỗi xảy ra khi tìm kiếm ngành học");
      }
    }
  };

  // Xử lý chọn ngành học để xem chi tiết hoặc chỉnh sửa
  const handleSelectMajor = (major: Major) => {
    if (major) {
      // Chỉ cập nhật selectedMajor mà không thay đổi majorsData
      setSelectedMajor(major);
    }
  };
  
  // Xử lý hiển thị kết quả tìm kiếm từ API getById
  const handleFilterByMajor = (major: Major) => {
    if (major) {
      // Hiển thị ngành học đã tìm thấy trong danh sách
      const paginatedData: PaginatedResponse<Major> = {
        items: [major],
        total: 1,
        page: 1,
        limit: pagination.limit,
        totalPages: 1
      };
      setMajorsData(paginatedData);
      
      // Đặt lại trạng thái phân trang
      setPagination({ ...pagination, page: 1 });
    }
  };

  // Xử lý thêm mới
  const handleAddNew = () => {
    navigate("/majors/create");
  };

  // Xử lý chuyển trang
  const handlePageChange = async (page: number) => {
    setPagination({ ...pagination, page });
    
    try {
      // Xử lý tìm kiếm thông thường (cả khi không có nội dung tìm kiếm)
      const apiParams: any = {
        page: page,
        limit: pagination.limit
      };
      
      // Phân tích searchQuery để xác định loại tìm kiếm
      if (searchQuery) {
        // Kiểm tra xem searchQuery có phải là mã ngành (số) hay không
        const majorId = parseInt(searchQuery);
        if (!isNaN(majorId)) {
          apiParams.code = searchQuery;
        } else {
          apiParams.name = searchQuery;
        }
      }
      
      // Gọi API để lấy dữ liệu trang mới
      const response = await majorsApi.getAll(apiParams);
      if (response.success) {
        // Kiểm tra nếu dữ liệu trả về là mảng
        if (Array.isArray(response.data)) {
          // Tạo cấu trúc dữ liệu phân trang từ mảng
          const paginatedData: PaginatedResponse<Major> = {
            items: response.data,
            total: response.data.length,
            page: page,
            limit: pagination.limit,
            totalPages: Math.ceil(response.data.length / pagination.limit)
          };
          setMajorsData(paginatedData);
        } else if (response.data && typeof response.data === 'object') {
          // Nếu dữ liệu đã có cấu trúc phân trang
          setMajorsData(response.data as PaginatedResponse<Major>);
        } else {
          // Trường hợp không có dữ liệu
          setMajorsData({
            items: [],
            total: 0,
            page: page,
            limit: pagination.limit,
            totalPages: 0
          });
        }
      } else {
        toast.error(response.message || "Không thể lấy dữ liệu trang");
      }
    } catch (error) {
      console.error("Lỗi khi chuyển trang:", error);
      toast.error("Có lỗi xảy ra khi chuyển trang");
    }
  };

  // Xử lý cập nhật thông tin ngành học
  const handleUpdateMajor = (majorId: string, formData: { name: string; code: string; description: string }) => {
    // Trong thực tế, sẽ gọi API để cập nhật ngành học
    console.log('Cập nhật ngành học:', majorId, formData);
    
    // Giả lập cập nhật thành công
    toast.success(`Đã cập nhật ngành học ${formData.name} thành công!`);
    setEditSheetOpen(false);
    
    // Cập nhật lại danh sách sau khi cập nhật
    // Trong thực tế, có thể reload data hoặc cập nhật state
    // navigate(0);
  };

  return {
    majorsData,
    pagination,
    searchQuery,
    viewSheetOpen,
    editSheetOpen,
    selectedMajor,
    handleView,
    handleEdit,
    handleDelete,
    handleSearch,
    handleAddNew,
    handlePageChange,
    handleUpdateMajor,
    handleSelectMajor,
    handleFilterByMajor,
    setViewSheetOpen,
    setEditSheetOpen,
    setSelectedMajor
  };
}
