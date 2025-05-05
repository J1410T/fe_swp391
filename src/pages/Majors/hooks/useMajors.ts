import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
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

  // Mặc định dữ liệu trống nếu không có dữ liệu từ loader
  const defaultData: PaginatedResponse<Major> = {
    items: [],
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 1
  };

  // State
  const [majorsData, setMajorsData] = useState<PaginatedResponse<Major>>(defaultData);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 9
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewSheetOpen, setViewSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [allMajors, setAllMajors] = useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý dữ liệu từ loader
  useEffect(() => {
    try {
      // Kiểm tra nếu có dữ liệu hợp lệ
      if (loaderData && loaderData.status === 'success' && loaderData.data) {
        // Đảm bảo items là một mảng hợp lệ
        const validItems = Array.isArray(loaderData.data.items)
          ? loaderData.data.items.filter(item => item && item.id)
          : [];

        // Lưu trữ toàn bộ dữ liệu để phân trang ở client
        setAllMajors(validItems);

        // Tính toán thông tin phân trang
        const totalItems = validItems.length;
        const pageLimit = 9; // Giới hạn 9 card mỗi trang
        const currentPage = 1; // Bắt đầu ở trang 1
        const totalPages = Math.ceil(totalItems / pageLimit);

        // Lấy các items của trang đầu tiên
        const startIndex = 0;
        const endIndex = Math.min(pageLimit, totalItems);
        const paginatedItems = validItems.slice(startIndex, endIndex);

        // Cập nhật state hiển thị
        setMajorsData({
          items: paginatedItems,
          total: totalItems,
          page: currentPage,
          limit: pageLimit,
          totalPages: totalPages
        });

        // Đảm bảo pagination state đồng bộ với dữ liệu hiển thị
        setPagination({
          page: currentPage,
          limit: pageLimit
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
    // Chọn ngành học để xóa và mở dialog xác nhận
    setSelectedMajor(major);
    setDeleteDialogOpen(true);
  };

  // Xử lý sau khi xóa ngành học thành công
  const handleMajorDeleted = async () => {
    // Tải lại dữ liệu sau khi xóa thành công
    setIsLoading(true);
    try {
      const response = await majorsApi.getAll();
      if (response.success && response.data) {
        // Xử lý dữ liệu trả về
        let validItems: Major[] = [];

        if (Array.isArray(response.data)) {
          validItems = response.data.filter(item => item && item.id);
        } else if (response.data && typeof response.data === 'object') {
          const paginatedResponse = response.data as PaginatedResponse<Major>;
          validItems = Array.isArray(paginatedResponse.items)
            ? paginatedResponse.items.filter(item => item && item.id)
            : [];
        }

        // Cập nhật dữ liệu và áp dụng phân trang
        setAllMajors(validItems);

        // Tính toán thông tin phân trang
        const totalItems = validItems.length;
        const totalPages = Math.ceil(totalItems / pagination.limit);

        // Kiểm tra trang hiện tại có vượt quá tổng số trang không
        const currentPage = pagination.page > totalPages && totalPages > 0 ? totalPages : pagination.page;
        setPagination({ ...pagination, page: currentPage });

        // Lấy dữ liệu trang hiện tại
        const startIndex = (currentPage - 1) * pagination.limit;
        const endIndex = Math.min(startIndex + pagination.limit, totalItems);
        const paginatedItems = validItems.slice(startIndex, endIndex);

        // Cập nhật dữ liệu hiển thị
        setMajorsData({
          items: paginatedItems,
          total: totalItems,
          page: currentPage,
          limit: pagination.limit,
          totalPages: totalPages
        });
      }
    } catch (error) {
      console.error("Lỗi khi tải lại dữ liệu sau khi xóa:", error);
      toast.error("Có lỗi xảy ra khi tải lại dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = async (params: { code?: string; name?: string }) => {
    // Lưu query để hiển thị trong UI
    setSearchQuery(params.name || params.code || "");
    setPagination({ ...pagination, page: 1 }); // Reset về trang 1 khi tìm kiếm

    try {
      // Xử lý trường hợp tìm kiếm theo mã ngành cụ thể (số nguyên)
      if (params.code && !params.name) {
        const majorCode = params.code.trim();
        // Kiểm tra xem có phải là mã ngành hợp lệ không (chỉ chứa số)
        if (/^\d+$/.test(majorCode)) {
          try {
            // Gọi API getById với mã ngành (sử dụng API /majors/{code})
            const detailResponse = await majorsApi.getById(parseInt(majorCode));
            if (detailResponse.success && detailResponse.data) {
              // Đảm bảo dữ liệu trả về là hợp lệ
              const majorData = detailResponse.data;
              console.log('Kết quả tìm kiếm theo mã ngành:', majorData);

              // Kiểm tra dữ liệu trả về có đầy đủ trường cần thiết không
              if (majorData && majorData.id) {
                // Tạo một mảng chứa ngành học đã tìm thấy
                const paginatedData: PaginatedResponse<Major> = {
                  items: [majorData],
                  total: 1,
                  page: 1,
                  limit: pagination.limit,
                  totalPages: 1
                };

                // Cập nhật trực tiếp vào state
                setMajorsData(paginatedData);
                toast.success(`Đã tìm thấy ngành học: ${majorData.name}`);
                return;
              } else {
                console.error('Dữ liệu ngành học không hợp lệ:', majorData);
                toast.error('Dữ liệu ngành học không hợp lệ');
              }
            } else {
              // Không tìm thấy theo mã ngành
              toast.error(`Không tìm thấy ngành học với mã ${majorCode}`);
              // Đặt lại dữ liệu về trạng thái trống
              setMajorsData({
                items: [],
                total: 0,
                page: 1,
                limit: pagination.limit,
                totalPages: 0
              });
              return;
            }
          } catch (error) {
            console.error("Lỗi khi tìm kiếm ngành học theo mã ngành:", error);
            // Nếu không tìm thấy theo mã ngành, hiển thị lỗi và đặt danh sách trống
            toast.error(`Không tìm thấy ngành học với mã ${majorCode}`);
            setMajorsData({
              items: [],
              total: 0,
              page: 1,
              limit: pagination.limit,
              totalPages: 0
            });
            return;
          }
        }
      }

      // Xử lý tìm kiếm thông thường
      let apiParams: any = {};

      // Phân tách xử lý tìm kiếm theo mã và theo tên để tránh xung đột
      if (params.name && params.name.trim() !== "") {
        // Chỉ dùng tham số name cho tìm kiếm theo tên
        apiParams = { name: params.name };
      }
      else if (params.code && params.code.trim() !== "") {
        // Khi tìm theo code, sử dụng tham số name vì API không chấp nhận tham số code trực tiếp
        apiParams = { name: params.code };
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
          // Lọc để chỉ giữ lại các đối tượng hợp lệ
          const validItems = response.data.filter(item => item && item.id);

          // Lưu trữ toàn bộ dữ liệu để phân trang ở client
          setAllMajors(validItems);

          // Tính toán thông tin phân trang
          const totalItems = validItems.length;
          const totalPages = Math.ceil(totalItems / pagination.limit);

          // Lấy các items của trang đầu tiên
          const startIndex = 0; // Trang 1
          const endIndex = Math.min(pagination.limit, totalItems);
          const paginatedItems = validItems.slice(startIndex, endIndex);

          // Cập nhật state để hiển thị
          const paginatedData: PaginatedResponse<Major> = {
            items: paginatedItems,
            total: totalItems,
            page: 1,
            limit: pagination.limit,
            totalPages: totalPages
          };
          setMajorsData(paginatedData);

          // Hiển thị thông báo tùy theo kết quả
          if (validItems.length === 0) {
            toast.error("Không tìm thấy ngành học nào phù hợp");
          } else if ((params.code && params.code.trim() !== "") || (params.name && params.name.trim() !== "")) {
            toast.success(`Đã tìm thấy ${validItems.length} ngành học`);
          } else {
            toast.success(`Đã tải ${validItems.length} ngành học`);
          }
        } else if (response.data && typeof response.data === 'object') {
          // Nếu dữ liệu đã có cấu trúc phân trang, lọc items hợp lệ
          const paginatedResponse = response.data as PaginatedResponse<Major>;
          const validItems = Array.isArray(paginatedResponse.items)
            ? paginatedResponse.items.filter(item => item && item.id)
            : [];

          // Lưu trữ toàn bộ dữ liệu để phân trang ở client
          setAllMajors(validItems);

          // Tính toán thông tin phân trang
          const totalItems = validItems.length;
          const totalPages = Math.ceil(totalItems / pagination.limit);

          // Lấy các items của trang đầu tiên
          const startIndex = 0; // Trang 1
          const endIndex = Math.min(pagination.limit, totalItems);
          const paginatedItems = validItems.slice(startIndex, endIndex);

          // Cập nhật state để hiển thị
          const validData = {
            ...paginatedResponse,
            items: paginatedItems,
            total: totalItems,
            page: 1,
            limit: pagination.limit,
            totalPages: totalPages
          };

          setMajorsData(validData);

          // Hiển thị thông báo tùy theo kết quả
          if (validItems.length === 0) {
            toast.error("Không tìm thấy ngành học nào phù hợp");
          } else if ((params.code && params.code.trim() !== "") || (params.name && params.name.trim() !== "")) {
            toast.success(`Đã tìm thấy ${validItems.length} ngành học`);
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
    if (major && major.id) {
      // Đảm bảo major là một đối tượng hợp lệ với đầy đủ thuộc tính
      console.log('Tìm thấy ngành học:', major);

      // Hiển thị ngành học đã tìm thấy trong danh sách
      const paginatedData: PaginatedResponse<Major> = {
        items: [major],
        total: 1,
        page: 1,
        limit: pagination.limit,
        totalPages: 1
      };

      // Cập nhật dữ liệu hiển thị
      setMajorsData(paginatedData);

      // Đặt lại trạng thái phân trang
      setPagination({ ...pagination, page: 1 });

      // Hiển thị thông báo thành công
      toast.success(`Đã tìm thấy ngành học: ${major.name}`);
    } else {
      console.error('Thông tin ngành học không hợp lệ:', major);
      toast.error('Thông tin ngành học không hợp lệ');
    }
  };

  // Xử lý thêm mới
  const handleAddNew = () => {
    setCreateDialogOpen(true);
  };

  // Xử lý sau khi tạo ngành học mới thành công
  const handleMajorCreated = async () => {
    // Tải lại dữ liệu sau khi tạo mới thành công
    setIsLoading(true);
    try {
      const response = await majorsApi.getAll();
      if (response.success && response.data) {
        // Xử lý dữ liệu trả về
        let validItems: Major[] = [];

        if (Array.isArray(response.data)) {
          validItems = response.data.filter(item => item && item.id);
        } else if (response.data && typeof response.data === 'object') {
          const paginatedResponse = response.data as PaginatedResponse<Major>;
          validItems = Array.isArray(paginatedResponse.items)
            ? paginatedResponse.items.filter(item => item && item.id)
            : [];
        }

        // Cập nhật dữ liệu và áp dụng phân trang
        setAllMajors(validItems);

        // Tính toán thông tin phân trang
        const totalItems = validItems.length;
        const totalPages = Math.ceil(totalItems / pagination.limit);

        // Lấy dữ liệu trang hiện tại
        const startIndex = (pagination.page - 1) * pagination.limit;
        const endIndex = Math.min(startIndex + pagination.limit, totalItems);
        const paginatedItems = validItems.slice(startIndex, endIndex);

        // Cập nhật dữ liệu hiển thị
        setMajorsData({
          items: paginatedItems,
          total: totalItems,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: totalPages
        });

        toast.success("Dữ liệu đã được cập nhật");
      }
    } catch (error) {
      console.error("Lỗi khi tải lại dữ liệu:", error);
      toast.error("Có lỗi xảy ra khi tải lại dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý chuyển trang (phân trang phía client)
  const handlePageChange = (page: number) => {
    // Cập nhật state phân trang
    setPagination({ ...pagination, page });

    // Tính toán phân trang từ bộ dữ liệu đã lưu
    const totalItems = allMajors.length;
    const totalPages = Math.ceil(totalItems / pagination.limit);

    // Tính toán chỉ số bắt đầu và kết thúc cho trang được chọn
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = Math.min(startIndex + pagination.limit, totalItems);

    // Lấy dữ liệu trang được chọn
    const paginatedItems = allMajors.slice(startIndex, endIndex);

    // Cập nhật dữ liệu hiển thị
    setMajorsData({
      items: paginatedItems,
      total: totalItems,
      page: page,
      limit: pagination.limit,
      totalPages: totalPages
    });
  };

  // Xử lý cập nhật thông tin ngành học
  const handleUpdateMajor = async (majorId: string, formData: { name: string; code: string; description: string }) => {
    try {
      setIsLoading(true);

      // Chuẩn bị dữ liệu cập nhật theo định dạng MajorUpdateData
      const updateData = {
        name: formData.name,
        code: formData.code,
        description: formData.description
      };

      // Gọi API để cập nhật ngành học với URL request "/majors/:id"
      const response = await majorsApi.update(parseInt(majorId), updateData);

      if (response.success) {
        toast.success(`Đã cập nhật ngành học ${formData.name} thành công!`);
        setEditSheetOpen(false);

        // Cập nhật lại danh sách sau khi cập nhật thành công
        await handleMajorCreated(); // Sử dụng hàm có sẵn để tải lại dữ liệu

        // Cập nhật selectedMajor với dữ liệu mới
        if (response.data) {
          setSelectedMajor(response.data);
        }
      } else {
        toast.error(response.message || "Cập nhật ngành học thất bại");
      }
    } catch (error: any) {
      console.error("Lỗi khi cập nhật ngành học:", error);
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật ngành học");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    majorsData,
    pagination,
    searchQuery,
    viewSheetOpen,
    editSheetOpen,
    createDialogOpen,
    deleteDialogOpen,
    selectedMajor,
    isLoading,
    handleView,
    handleEdit,
    handleDelete,
    handleSearch,
    handleAddNew,
    handlePageChange,
    handleUpdateMajor,
    handleSelectMajor,
    handleFilterByMajor,
    handleMajorCreated,
    handleMajorDeleted,
    setViewSheetOpen,
    setEditSheetOpen,
    setCreateDialogOpen,
    setDeleteDialogOpen,
    setSelectedMajor
  };
}
