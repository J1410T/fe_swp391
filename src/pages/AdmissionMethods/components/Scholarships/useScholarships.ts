import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { scholarshipsApi } from "@/api/resources/scholarships";
import { ScholarshipResponse } from "@/types/entities/scholarship";

// Props cho hook useScholarships
interface UseScholarshipsProps {
  academicYear: string | number;
  onRefetch: () => Promise<void>;
}

// Sử dụng ScholarshipResponse từ entities của hệ thống
export function useScholarships({ academicYear, onRefetch }: UseScholarshipsProps) {
  const [scholarships, setScholarships] = useState<ScholarshipResponse[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Chuyển đổi academicYear thành số
  const year = typeof academicYear === 'string' ? parseInt(academicYear, 10) : academicYear;

  // Fetch scholarships from API
  const fetchScholarships = useCallback(async () => {
    try {
      setFetchLoading(true);
      setError(null);

      const response = await scholarshipsApi.getAll();

      if (response.success && response.data) {
        setScholarships(response.data);
      } else {
        throw new Error(response.message || "Không thể lấy dữ liệu học bổng");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      setError(error);
      toast.error("Không thể lấy dữ liệu học bổng");
      console.error(error);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // Fetch scholarships when component mounts or academicYear changes
  useEffect(() => {
    fetchScholarships();
  }, [academicYear, fetchScholarships]);

  // Override the onRefetch function to use our fetchScholarships
  const handleRefetch = useCallback(async () => {
    await fetchScholarships();
    await onRefetch();
  }, [fetchScholarships, onRefetch]);

  const handleEdit = useCallback((scholarship: ScholarshipResponse) => {
    setSelectedScholarship(scholarship);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((scholarship: ScholarshipResponse) => {
    setSelectedScholarship(scholarship);
    setIsDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedScholarship) return;

    try {
      setLoading(true);

      // Gọi API để xóa học bổng
      const response = await scholarshipsApi.delete(selectedScholarship.id);

      if (response.success) {
        toast.success("Đã xóa học bổng thành công");
        // Cập nhật lại danh sách học bổng
        await handleRefetch();
      } else {
        throw new Error(response.message || "Không thể xóa học bổng");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      toast.error("Không thể xóa học bổng");
      console.error(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedScholarship(null);
    }
  }, [selectedScholarship, handleRefetch]);

  // Lọc học bổng theo năm học
  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.availabilities.some(availability =>
      availability.academicYear.year === year
    )
  );

  // Lọc học bổng theo từ khóa tìm kiếm
  const filteredResults = filteredScholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm học bổng mới
  const addScholarship = useCallback(async (formData: FormData) => {
    try {
      setLoading(true);

      // Lấy dữ liệu từ form
      const name = formData.get('name') as string;
      const condition = formData.get('condition') as string;
      const amount = parseInt(formData.get('amount') as string, 10);
      const description = formData.get('description') as string;
      const application_url = formData.get('application_url') as string;

      // Lấy campus_id và major_id từ form
      const campusIdValue = formData.get('campus_id') as string;
      const majorIdValue = formData.get('major_id') as string;

      // Chuyển đổi campus_id và major_id thành số hoặc null
      const campus_id = campusIdValue ? parseInt(campusIdValue, 10) : null;
      const major_id = majorIdValue ? parseInt(majorIdValue, 10) : null;

      try {
        // Gọi API để tạo học bổng mới
        // Thêm trường major_id vì API yêu cầu
        const response = await scholarshipsApi.create({
          name,
          condition,
          amount,
          description,
          application_url,
          major_id,
          campus_id
        });

        if (response.success) {
          toast.success("Thêm học bổng thành công");
          // Cập nhật lại danh sách học bổng
          await handleRefetch();
          return true;
        } else {
          throw new Error(response.message || "Không thể thêm học bổng");
        }
      } catch (error) {
        // Log chi tiết lỗi để debug
        console.error('Error creating scholarship:', error);
        console.error('Request body:', {
          name,
          condition,
          amount,
          description,
          application_url,
          major_id,
          campus_id
        });
        throw error;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      toast.error("Không thể thêm học bổng");
      console.error(error);
      return false;
    } finally {
      setLoading(false);
      setIsAddModalOpen(false);
    }
  }, [academicYear, handleRefetch]);

  // Cập nhật học bổng
  const updateScholarship = useCallback(async (formData: FormData) => {
    if (!selectedScholarship) return false;

    try {
      setLoading(true);

      // Lấy dữ liệu từ form
      const name = formData.get('name') as string;
      const condition = formData.get('condition') as string;
      const amount = parseInt(formData.get('amount') as string, 10);
      const description = formData.get('description') as string;
      const application_url = formData.get('application_url') as string;

      // Gọi API để cập nhật học bổng
      const response = await scholarshipsApi.update(selectedScholarship.id, {
        name,
        condition,
        amount,
        description,
        application_url
      });

      if (response.success) {
        toast.success("Cập nhật học bổng thành công");
        // Cập nhật lại danh sách học bổng
        await handleRefetch();
        return true;
      } else {
        throw new Error(response.message || "Không thể cập nhật học bổng");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      toast.error("Không thể cập nhật học bổng");
      console.error(error);
      return false;
    } finally {
      setLoading(false);
      setIsEditModalOpen(false);
      setSelectedScholarship(null);
    }
  }, [selectedScholarship, handleRefetch]);

  return {
    // State
    scholarships,
    filteredScholarships,
    filteredResults,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedScholarship,
    loading,
    fetchLoading,
    error,
    searchTerm,
    year,

    // Actions
    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setSearchTerm,
    handleEdit,
    handleDelete,
    confirmDelete,
    fetchScholarships,
    addScholarship,
    updateScholarship
  };
}
