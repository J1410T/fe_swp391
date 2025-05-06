/**
 * API cho năm tuyển sinh
 */

import type { ApiResponse } from "@/types";
import { api } from "@/api/base";

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
      return await api.get<ApiResponse<AcademicYearData[]>>(API_PATH);
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
      return await api.get<ApiResponse<AcademicYearData>>(`${API_PATH}/${year}`);
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

      // Gửi dữ liệu lên API
      return await api.post<ApiResponse<AcademicYearData>>(API_PATH, { year: yearValue });
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
      return await api.delete<ApiResponse<void>>(`${API_PATH}/${id}`);
    } catch (error) {
      // Xử lý lỗi khi xóa năm học
      throw error;
    }
  },
};
