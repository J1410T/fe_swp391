/**
 * API cho cơ sở đào tạo (campus)
 */

import { api } from '../base';
import type { ApiResponse } from '@/types';
import type { CampusResponse } from '@/types/entities/campus';

/**
 * API cho cơ sở đào tạo
 */
export const campusesApi = {
  /**
   * Lấy danh sách cơ sở đào tạo
   * @returns Promise với danh sách cơ sở đào tạo
   */
  getAll: async (): Promise<ApiResponse<CampusResponse[]>> => {
    return api.get<ApiResponse<CampusResponse[]>>('/campuses');
  },
  
  /**
   * Lấy cơ sở đào tạo theo ID
   * @param id ID của cơ sở đào tạo
   * @returns Promise với cơ sở đào tạo
   */
  getById: async (id: number): Promise<ApiResponse<CampusResponse>> => {
    return api.get<ApiResponse<CampusResponse>>(`/campuses/${id}`);
  },
  
  /**
   * Tạo cơ sở đào tạo mới
   * @param data Dữ liệu cơ sở đào tạo
   * @returns Promise với cơ sở đào tạo đã tạo
   */
  create: async (data: Omit<CampusResponse, 'id'>): Promise<ApiResponse<CampusResponse>> => {
    return api.post<ApiResponse<CampusResponse>>('/campuses', data);
  },
  
  /**
   * Cập nhật cơ sở đào tạo
   * @param id ID của cơ sở đào tạo
   * @param data Dữ liệu cập nhật
   * @returns Promise với cơ sở đào tạo đã cập nhật
   */
  update: async (id: number, data: Partial<Omit<CampusResponse, 'id'>>): Promise<ApiResponse<CampusResponse>> => {
    return api.put<ApiResponse<CampusResponse>>(`/campuses/${id}`, data);
  },
  
  /**
   * Xóa cơ sở đào tạo
   * @param id ID của cơ sở đào tạo
   * @returns Promise void
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<ApiResponse<void>>(`/campuses/${id}`);
  }
};
