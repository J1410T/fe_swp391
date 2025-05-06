/**
 * API cho ký túc xá
 */

import { api } from "../base";
import type { ApiResponse } from "@/types";
import type { DormitoryResponse } from "@/types/entities/dormitory";

export type { DormitoryResponse };

/**
 * API cho ký túc xá
 */
export const dormitoriesApi = {
  /**
   * Lấy danh sách ký túc xá
   * @returns Promise với danh sách ký túc xá
   */
  getAll: async (): Promise<ApiResponse<DormitoryResponse[]>> => {
    return api.get<ApiResponse<DormitoryResponse[]>>("/dormitories");
  },

  /**
   * Lấy ký túc xá theo ID
   * @param id ID của ký túc xá
   * @returns Promise với ký túc xá
   */
  getById: async (id: number): Promise<ApiResponse<DormitoryResponse>> => {
    return api.get<ApiResponse<DormitoryResponse>>(`/dormitories/${id}`);
  },

  /**
   * Lấy danh sách ký túc xá theo campus ID
   * @param campusId ID của campus
   * @returns Promise với danh sách ký túc xá của campus
   */
  getByCampusId: async (
    campusId: number
  ): Promise<ApiResponse<DormitoryResponse[]>> => {
    return api.get<ApiResponse<DormitoryResponse[]>>("/dormitories", {
      params: { campus_id: campusId },
    });
  },

  /**
   * Tạo ký túc xá mới
   * @param data Dữ liệu ký túc xá
   * @returns Promise với ký túc xá đã tạo
   */
  create: async (
    data: Omit<DormitoryResponse, "id" | "campus">
  ): Promise<ApiResponse<DormitoryResponse>> => {
    return api.post<ApiResponse<DormitoryResponse>>("/dormitories", data);
  },

  /**
   * Cập nhật ký túc xá
   * @param id ID của ký túc xá
   * @param data Dữ liệu cập nhật
   * @returns Promise với ký túc xá đã cập nhật
   */
  update: async (
    id: number,
    data: Partial<Omit<DormitoryResponse, "id" | "campus">>
  ): Promise<ApiResponse<DormitoryResponse>> => {
    return api.put<ApiResponse<DormitoryResponse>>(`/dormitories/${id}`, data);
  },

  /**
   * Xóa ký túc xá
   * @param id ID của ký túc xá
   * @returns Promise void
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<ApiResponse<void>>(`/dormitories/${id}`);
  },
};
