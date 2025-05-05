/**
 * API cho năm tuyển sinh
 */

import type { ApiResponse } from "@/types";

// Endpoint cho năm tuyển sinh
const API_PATH = "/api/academic-years";

/**
 * Interface cho dữ liệu năm tuyển sinh
 */
export interface AcademicYearData {
  /** ID của năm tuyển sinh */
  id?: number;
  /** Năm tuyển sinh */
  year: number | string;
  /** Mô tả (không bắt buộc) */
  description?: string;
}

/**
 * API cho năm tuyển sinh
 */
export const academicYearsApi = {
  /**
   * Lấy danh sách năm tuyển sinh
   * @returns Promise với danh sách năm tuyển sinh
   */
  getAll: async (): Promise<ApiResponse<AcademicYearData[]>> => {
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

      // Gửi request lấy danh sách với token xác thực
      const response = await fetch(API_PATH, {
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
      // Xử lý lỗi khi lấy danh sách năm học
      throw error;
    }
  },

  /**
   * Lấy năm tuyển sinh theo năm
   * @param year Năm tuyển sinh
   * @returns Promise với năm tuyển sinh
   */
  getByYear: async (year: string | number): Promise<ApiResponse<AcademicYearData>> => {
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

      // Gửi request lấy năm học với token xác thực
      const response = await fetch(`${API_PATH}/${year}`, {
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
      // Xử lý lỗi khi lấy năm học theo năm
      throw error;
    }
  },

  /**
   * Tạo năm tuyển sinh mới
   * @param data Dữ liệu năm tuyển sinh
   * @returns Promise với năm tuyển sinh đã tạo
   */
  create: async (data: AcademicYearData): Promise<ApiResponse<AcademicYearData>> => {
    try {
      // Đảm bảo year là số nguyên
      const yearValue = typeof data.year === 'string' ? parseInt(data.year, 10) : data.year;

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

      // Gửi dữ liệu lên API với token xác thực
      const response = await fetch(API_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(tokenValue ? { 'Authorization': `Bearer ${tokenValue}` } : {})
        },
        body: JSON.stringify({ year: yearValue })
      });

      // Đọc response
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      // Xử lý lỗi khi tạo năm học
      throw error;
    }
  },



  /**
   * Xóa năm tuyển sinh
   * @param id ID của năm tuyển sinh
   * @returns Promise void
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
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

      // Gửi request xóa với token xác thực
      const response = await fetch(`${API_PATH}/${id}`, {
        method: 'DELETE',
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
      // Xử lý lỗi khi xóa năm học
      throw error;
    }
  },
};
