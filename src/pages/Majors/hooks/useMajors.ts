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
    console.log('Xóa ngành học:', major.id);
    
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
      // Gọi API để tìm kiếm
      const response = await majorsApi.getAll({
        code: params.code,
        name: params.name,
        page: 1,
        limit: pagination.limit
      });
      
      if (response.success) {
        // Kiểm tra nếu dữ liệu trả về là mảng
        if (Array.isArray(response.data)) {
          // Tạo cấu trúc dữ liệu phân trang từ mảng
          const paginatedData: PaginatedResponse<Major> = {
            items: response.data,
            total: response.data.length,
            page: 1,
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
            page: 1,
            limit: pagination.limit,
            totalPages: 0
          });
          toast.error("Không tìm thấy ngành học nào phù hợp");
        }
      } else {
        toast.error(response.message || "Không tìm thấy ngành học nào phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm ngành học:", error);
      toast.error("Có lỗi xảy ra khi tìm kiếm ngành học");
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
      // Gọi API để lấy dữ liệu trang mới
      const response = await majorsApi.getAll({
        name: searchQuery, // Sử dụng query hiện tại
        page: page,
        limit: pagination.limit
      });
      
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
    setViewSheetOpen,
    setEditSheetOpen
  };
}
