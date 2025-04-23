/**
 * API cho majors
 */

import type { Major } from '@/types/entities/major';
import type { ApiResponse, PaginatedResponse, PaginationParams, FilterParams, SortParams } from '@/types';

/**
 * API cho majors
 */
export const majorsApi = {
  /**
   * Lấy danh sách majors
   * @param params Params cho phân trang, sắp xếp và lọc
   * @returns Promise với danh sách majors
   */
  getAll: async (
    params?: PaginationParams & SortParams & Partial<FilterParams>
  ): Promise<ApiResponse<PaginatedResponse<Major>>> => {
    // TODO: Implement API call to get majors
    return {} as ApiResponse<PaginatedResponse<Major>>;
  },
  
  /**
   * Lấy major theo ID
   * @param id ID của major
   * @returns Promise với major
   */
  getById: async (id: string): Promise<ApiResponse<Major>> => {
    // TODO: Implement API call to get major by ID
    return {} as ApiResponse<Major>;
  },
  
  /**
   * Tạo major mới
   * @param data Dữ liệu major
   * @returns Promise với major đã tạo
   */
  create: async (data: Omit<Major, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Major>> => {
    // TODO: Implement API call to create major
    return {} as ApiResponse<Major>;
  },
  
  /**
   * Cập nhật major
   * @param id ID của major
   * @param data Dữ liệu cập nhật
   * @returns Promise với major đã cập nhật
   */
  update: async (id: string, data: Partial<Major>): Promise<ApiResponse<Major>> => {
    // TODO: Implement API call to update major
    return {} as ApiResponse<Major>;
  },
  
  /**
   * Xóa major
   * @param id ID của major
   * @returns Promise void
   */
  delete: async (id: string): Promise<ApiResponse<void>> => {
    // TODO: Implement API call to delete major
    return {} as ApiResponse<void>;
  }
};
