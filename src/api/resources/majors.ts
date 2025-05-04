/**
 * API cho ngành học
 */

import { api } from '@/api/base';
import type { Major, MajorCreateData, MajorUpdateData } from '@/types/entities/major';
import type { ApiResponse, PaginatedResponse, PaginationParams, FilterParams, SortParams } from '@/types';
import { createResource } from '@/utils/suspense';

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
    return await api.get('/majors', { params });
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
    }
  }
};
