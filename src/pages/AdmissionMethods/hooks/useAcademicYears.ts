import { useState, useCallback } from "react";
import { toast } from "sonner";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { AdmissionMethod } from "@/types";

interface AcademicYear {
  year: string;
  description?: string;
  admissionMethods: AdmissionMethod[];
}

export function useAcademicYears() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  /**
   * Lấy danh sách các năm học và phương thức tuyển sinh
   */
  const fetchAcademicYears = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Lấy tất cả phương thức tuyển sinh
      const response = await admissionMethodsApi.getAll();
      
      // Nhóm phương thức tuyển sinh theo năm học
      const methods = response.data;
      const yearMap = new Map<string, AdmissionMethod[]>();
      
      // Tạo các năm mặc định để đảm bảo luôn có dữ liệu
      const defaultYears = ["2024", "2025", "2026"];
      defaultYears.forEach(year => {
        if (!yearMap.has(year)) {
          yearMap.set(year, []);
        }
      });
      
      methods.forEach(method => {
        // Sử dụng năm thực tế hoặc gán vào năm 2024 nếu không có
        const year = method.academicYear || "2024";
        if (!yearMap.has(year)) {
          yearMap.set(year, []);
        }
        yearMap.get(year)?.push(method);
      });
      
      // Chuyển đổi Map thành mảng để hiển thị
      const years: AcademicYear[] = Array.from(yearMap.entries())
        .map(([year, methods]) => ({
          year,
          admissionMethods: methods.sort((a, b) => a.id - b.id),
        }))
        .sort((a, b) => b.year.localeCompare(a.year)); // Sắp xếp giảm dần theo năm
      
      setAcademicYears(years);
      
      // Mặc định mở rộng năm đầu tiên nếu có
      if (years.length > 0 && !expandedYear) {
        setExpandedYear(years[0].year);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      setError(error);
      toast.error("Không thể tải dữ liệu năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  }, [expandedYear]);

  /**
   * Thêm năm học mới
   */
  const addAcademicYear = useCallback(async (year: string, description?: string) => {
    // Kiểm tra xem năm đã tồn tại chưa
    if (academicYears.some(y => y.year === year)) {
      toast.error(`Năm tuyển sinh ${year} đã tồn tại`);
      return;
    }
    
    // Thêm năm mới vào danh sách
    const newYear: AcademicYear = {
      year,
      description,
      admissionMethods: [],
    };
    
    setAcademicYears(prev => [newYear, ...prev].sort((a, b) => b.year.localeCompare(a.year)));
    setExpandedYear(year);
  }, [academicYears]);

  /**
   * Cập nhật thông tin năm học
   */
  const updateAcademicYear = useCallback(async (year: string, description?: string) => {
    setAcademicYears(prev => 
      prev.map(y => 
        y.year === year 
          ? { ...y, description } 
          : y
      )
    );
  }, []);

  /**
   * Xóa năm học
   */
  const deleteAcademicYear = useCallback(async (year: string) => {
    // Xóa năm khỏi danh sách
    setAcademicYears(prev => prev.filter(y => y.year !== year));
    
    // Nếu đang mở rộng năm bị xóa, chuyển sang năm khác
    if (expandedYear === year) {
      const remainingYears = academicYears.filter(y => y.year !== year);
      setExpandedYear(remainingYears.length > 0 ? remainingYears[0].year : null);
    }
  }, [academicYears, expandedYear]);

  /**
   * Chuyển đổi trạng thái mở rộng/thu gọn của năm
   */
  const toggleYearExpanded = useCallback((year: string) => {
    setExpandedYear(prev => (prev === year ? null : year));
  }, []);

  return {
    academicYears,
    loading,
    error,
    expandedYear,
    fetchAcademicYears,
    addAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
    toggleYearExpanded,
  };
}
