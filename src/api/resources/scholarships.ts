/**
 * API cho học bổng
 */

import { api } from '../base';
import type { ApiResponse } from '@/types';
import type { ScholarshipResponse } from '@/types/entities/scholarship';

/**
 * API cho học bổng
 */
export const scholarshipsApi = {
  /**
   * Lấy danh sách học bổng
   * @returns Promise với danh sách học bổng
   */
  getAll: async (): Promise<ApiResponse<ScholarshipResponse[]>> => {
    return api.get<ApiResponse<ScholarshipResponse[]>>('/scholarships');
  },

  /**
   * Lấy học bổng theo ID
   * @param id ID của học bổng
   * @returns Promise với học bổng
   */
  getById: async (id: number): Promise<ApiResponse<ScholarshipResponse>> => {
    return api.get<ApiResponse<ScholarshipResponse>>(`/scholarships/${id}`);
  },

  /**
   * Tạo học bổng mới
   * @param data Dữ liệu học bổng
   * @returns Promise với học bổng đã tạo
   */
  create: async (data: {
    name: string;
    condition: string;
    amount: number;
    description: string;
    application_url: string;
    major_id: number | null;
    campus_id?: number | null;
  }): Promise<ApiResponse<ScholarshipResponse>> => {
    return api.post<ApiResponse<ScholarshipResponse>>('/scholarships', data);
  },

  /**
   * Cập nhật học bổng
   * @param id ID của học bổng
   * @param data Dữ liệu cập nhật
   * @returns Promise với học bổng đã cập nhật
   */
  update: async (id: number, data: Partial<Omit<ScholarshipResponse, 'id' | 'major' | 'campus'>>): Promise<ApiResponse<ScholarshipResponse>> => {
    return api.put<ApiResponse<ScholarshipResponse>>(`/scholarships/${id}`, data);
  },

  /**
   * Xóa học bổng
   * @param id ID của học bổng
   * @returns Promise void
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<ApiResponse<void>>(`/scholarships/${id}`);
  }
};
