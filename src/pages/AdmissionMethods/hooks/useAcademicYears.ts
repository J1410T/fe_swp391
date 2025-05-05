import { useState, useCallback } from "react";
import { toast } from "sonner";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { academicYearsApi } from "@/api/resources/academic-years";
import { AdmissionMethod } from "@/types";

interface AcademicYear {
  id: number;
  year: string | number;
  description?: string;
  admissionMethods: AdmissionMethod[];
}

export function useAcademicYears() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [expandedYear, setExpandedYear] = useState<string | number | null>(null);

  /**
   * Lấy danh sách các năm học và phương thức tuyển sinh
   */
  const fetchAcademicYears = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Lấy danh sách năm tuyển sinh từ API
      const yearsResponse = await academicYearsApi.getAll();

      // Đảm bảo dữ liệu trả về là mảng
      const yearsData = Array.isArray(yearsResponse.data) ? yearsResponse.data : [];

      // Nếu không có năm nào, tạo các năm mặc định
      if (yearsData.length === 0) {
        const defaultYears = [2024, 2025, 2026];
        const defaultAcademicYears: AcademicYear[] = defaultYears.map((year, index) => ({
          id: index + 1, // Giả lập ID
          year,
          admissionMethods: [],
        }));

        setAcademicYears(defaultAcademicYears);

        // Mặc định mở rộng năm đầu tiên nếu có
        if (defaultAcademicYears.length > 0 && !expandedYear) {
          setExpandedYear(defaultAcademicYears[0].year);
        }

        setLoading(false);
        return;
      }

      // Lấy tất cả phương thức tuyển sinh
      const methodsResponse = await admissionMethodsApi.getAll();
      const methods = methodsResponse.data;

      // Tạo map từ năm tuyển sinh đến danh sách phương thức tuyển sinh
      const yearMap = new Map<string, AdmissionMethod[]>();

      // Khởi tạo map với các năm từ API
      yearsData.forEach(yearData => {
        // Đảm bảo year là chuỗi
        const yearStr = String(yearData.year);
        yearMap.set(yearStr, []);
      });

      // Thêm phương thức tuyển sinh vào năm tương ứng
      methods.forEach(method => {
        const year = method.academicYear || "2024";
        if (!yearMap.has(year)) {
          yearMap.set(year, []);
        }
        yearMap.get(year)?.push(method);
      });

      // Chuyển đổi Map thành mảng để hiển thị
      const years: AcademicYear[] = Array.from(yearMap.entries())
        .map(([year, methods]) => {
          // Tìm dữ liệu năm từ API
          const yearData = yearsData.find(y => String(y.year) === year);

          return {
            id: yearData?.id || 0, // Sử dụng ID từ API hoặc giá trị mặc định
            year,
            description: yearData?.description,
            admissionMethods: methods.sort((a, b) => a.id - b.id),
          };
        })
        .sort((a, b) => {
          // Đảm bảo year là chuỗi trước khi sử dụng localeCompare
          const yearA = String(a.year);
          const yearB = String(b.year);
          return yearB.localeCompare(yearA); // Sắp xếp giảm dần theo năm
        });

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
  const addAcademicYear = useCallback(async (year: string | number) => {
    try {
      // Kiểm tra xem năm đã tồn tại chưa
      if (academicYears.some(y => y.year === year)) {
        toast.error(`Năm tuyển sinh ${year} đã tồn tại`);
        return;
      }

      setLoading(true);

      // Gọi API để thêm năm mới
      const response = await academicYearsApi.create({
        year,
      });

      if (!response.success) {
        throw new Error(response.message || "Không thể thêm năm tuyển sinh");
      }

      // Thêm năm mới vào danh sách với ID từ response
      const newYear: AcademicYear = {
        id: response.data?.id || 0,
        year,
        admissionMethods: [],
      };

      setAcademicYears(prev => [newYear, ...prev].sort((a, b) => {
        // Đảm bảo year là chuỗi trước khi sử dụng localeCompare
        const yearA = String(a.year);
        const yearB = String(b.year);
        return yearB.localeCompare(yearA); // Sắp xếp giảm dần theo năm
      }));
      setExpandedYear(year);

      toast.success(`Đã thêm năm tuyển sinh ${year}`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      setError(error);
      toast.error("Không thể thêm năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  }, [academicYears]);



  /**
   * Xóa năm học
   */
  const deleteAcademicYear = useCallback(async (year: string | number) => {
    try {
      // Tìm năm học trong danh sách để lấy ID
      const academicYear = academicYears.find(y => y.year === year);
      if (!academicYear) {
        toast.error(`Không tìm thấy năm tuyển sinh ${year}`);
        return;
      }

      setLoading(true);

      // Gọi API để xóa năm bằng ID
      await academicYearsApi.delete(academicYear.id);

      // Xóa năm khỏi danh sách
      setAcademicYears(prev => prev.filter(y => y.year !== year));

      // Nếu đang mở rộng năm bị xóa, chuyển sang năm khác
      if (expandedYear === year) {
        const remainingYears = academicYears.filter(y => y.year !== year);
        setExpandedYear(remainingYears.length > 0 ? remainingYears[0].year : null);
      }

      toast.success(`Đã xóa năm tuyển sinh ${year}`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Lỗi không xác định");
      setError(error);
      toast.error("Không thể xóa năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  }, [academicYears, expandedYear]);

  /**
   * Chuyển đổi trạng thái mở rộng/thu gọn của năm
   */
  const toggleYearExpanded = useCallback((year: string | number) => {
    setExpandedYear(prev => (prev === year ? null : year));
  }, []);

  return {
    academicYears,
    loading,
    error,
    expandedYear,
    fetchAcademicYears,
    addAcademicYear,
    deleteAcademicYear,
    toggleYearExpanded,
  };
}
