/**
 * API cho ngành học
 */

import { api } from '@/api/base';
import type { Major, MajorCreateData, MajorUpdateData } from '@/types/entities/major';
import type { ApiResponse, PaginatedResponse, PaginationParams, FilterParams, SortParams } from '@/types';
import { createResource } from '@/utils/suspense';

// Endpoint cho ngành học
const API_PATH = "/api/majors";

/**
 * Interface cho dữ liệu campus
 */
export interface Campus {
  code: string;
  name: string;
}

/**
 * Interface cho dữ liệu academic year
 */
export interface AcademicYear {
  year: number;
}

/**
 * Interface cho dữ liệu major campus admission
 */
export interface MajorCampusAdmission {
  tuition_fee: number;
  quota: number;
  campus: Campus;
  academicYear: AcademicYear;
}

/**
 * Interface cho dữ liệu career
 */
export interface Career {
  id: number;
  name: string;
  description: string;
  salary_range: string;
  category: string;
  info_url: string;
  major_id: number;
}

/**
 * Interface cho dữ liệu ngành học với campus admissions
 */
export interface MajorWithCampusData {
  id: number;
  name: string;
  code: string;
  careers: Career[];
  majorCampusAdmissions: MajorCampusAdmission[];
}

/**
 * API cho ngành học
 */
export const majorsApi = {
  /**
   * Lấy danh sách ngành học với phân trang và lọc
   * @param params Params cho phân trang, sắp xếp và lọc
   * @returns Promise với danh sách ngành học
   */
  getAll: async (
    params?: PaginationParams & SortParams & Partial<FilterParams>
  ): Promise<ApiResponse<Major[]>> => {
    // Kiểm tra và định dạng lại tham số tìm kiếm nếu cần
    const queryParams = { ...params } as any; // Sử dụng any để tránh lỗi kiểu dữ liệu

    // Loại bỏ các tham số phân trang vì API không chấp nhận chúng
    if (queryParams.page) delete queryParams.page;
    if (queryParams.limit) delete queryParams.limit;
    if (queryParams.sortBy) delete queryParams.sortBy;
    if (queryParams.sortOrder) delete queryParams.sortOrder;

    // Xử lý tham số code - API không chấp nhận tham số code
    if (queryParams.code) {
      // Nếu là số, có thể đây là ID
      if (!isNaN(Number(queryParams.code))) {
        queryParams.id = Number(queryParams.code);
      } else {
        // Nếu không phải số, có thể đây là mã ngành
        // Chuyển thành tham số major_code hoặc có thể sử dụng name để tìm kiếm tương đương
        queryParams.name = queryParams.code;
      }
      // Xóa tham số code vì API không chấp nhận
      delete queryParams.code;
    }

    // Xử lý lỗi - Loại bỏ hoặc chuyển đổi major_code nếu không phải số
    if (queryParams.major_code && isNaN(Number(queryParams.major_code))) {
      delete queryParams.major_code; // Xóa nếu không phải số
    }

    // Phân tích tham số tìm kiếm theo tên
    if (queryParams && queryParams.name) {
      const searchName = queryParams.name;

      // Khi tìm kiếm theo tên, đảm bảo không có major_code
      if (queryParams.major_code) {
        delete queryParams.major_code;
      }

      // Tìm kiếm với tham số name đúng như API mong đợi
      try {
        // Chỉ giữ lại tham số name
        const searchParams = { name: searchName };

        // Gọi API để tìm kiếm theo tên
        return await api.get('/majors', { params: searchParams });
      } catch (error) {
        console.error("Lỗi khi tìm kiếm theo tên:", error);
        throw error;
      }
    }

    // Nếu không có tìm kiếm theo tên, sử dụng API thông thường mà không có phân trang
    return await api.get('/majors', { params: queryParams });
  },

  /**
   * Lấy ngành học theo ID
   * @param id ID của ngành học
   * @returns Promise với ngành học
   */
  getById: async (id: number): Promise<ApiResponse<Major>> => {
    return await api.get(`/majors/${id}`);
  },

  /**
   * Tạo ngành học mới
   * @param data Dữ liệu ngành học
   * @returns Promise với ngành học đã tạo
   */
  create: async (data: MajorCreateData): Promise<ApiResponse<Major>> => {
    return await api.post('/majors', data);
  },

  /**
   * Cập nhật ngành học
   * @param id ID của ngành học
   * @param data Dữ liệu cập nhật
   * @returns Promise với ngành học đã cập nhật
   */
  update: async (id: number, data: MajorUpdateData): Promise<ApiResponse<Major>> => {
    return await api.put(`/majors/${id}`, data);
  },

  /**
   * Xóa ngành học
   * @param id ID của ngành học
   * @returns Promise void
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    return await api.delete(`/majors/${id}`);
  },

  /**
   * Lấy danh sách ngành học theo năm học
   * @param academicYear Năm học
   * @returns Promise với danh sách ngành học
   */
  getByAcademicYear: async (academicYear: string | number): Promise<ApiResponse<MajorWithCampusData[]>> => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('auth_token');
      let tokenValue = null;

      if (token) {
        try {
          const tokenData = JSON.parse(token);
          tokenValue = tokenData.value;
        } catch (e) {
          // Lỗi khi parse token
        }
      }

      // Gửi request lấy danh sách ngành học với token xác thực
      const response = await fetch(`${API_PATH}?academic_year=${academicYear}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(tokenValue ? { 'Authorization': `Bearer ${tokenValue}` } : {})
        }
      });

      // Đọc response
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      // Xử lý lỗi khi lấy danh sách ngành học
      throw error;
    }
  },

  /**
   * Tạo API resource cho React Suspense
   */
  resource: {
    /**
     * Resource để lấy danh sách ngành học
     */
    getAll: (params?: PaginationParams & SortParams & Partial<FilterParams>) => {
      return createResource(majorsApi.getAll(params));
    },

    /**
     * Resource để lấy chi tiết ngành học
     */
    getById: (id: number) => {
      return createResource(majorsApi.getById(id));
    },

    /**
     * Resource để lấy danh sách ngành học theo năm học
     */
    getByAcademicYear: (academicYear: string | number) => {
      return createResource(majorsApi.getByAcademicYear(academicYear));
    }
  }
};
