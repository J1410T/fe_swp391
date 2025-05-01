/**
 * API cho phương thức tuyển sinh
 */

import { api } from "@/api/base";
import type {
  AdmissionMethod,
  ApiResponse,
  PaginationParams,
  FilterParams,
  SortParams,
} from "@/types";

// Endpoint cho phương thức tuyển sinh
const ENDPOINT = "/admission-methods";

/**
 * API cho phương thức tuyển sinh
 */
export const admissionMethodsApi = {
  /**
   * Lấy danh sách phương thức tuyển sinh
   * @param params Params cho phân trang, sắp xếp và lọc
   * @returns Promise với danh sách phương thức tuyển sinh
   */
  getAll: async (
    params?: PaginationParams & SortParams & Partial<FilterParams>
  ): Promise<ApiResponse<AdmissionMethod[]>> => {
    const response = await api.get<ApiResponse<AdmissionMethod[]>>(ENDPOINT, {
      params,
    });
    return response;
  },

  /**
   * Lấy phương thức tuyển sinh theo ID
   * @param id ID của phương thức tuyển sinh
   * @returns Promise với phương thức tuyển sinh
   */
  getById: async (id: string): Promise<ApiResponse<AdmissionMethod>> => {
    const response = await api.get<ApiResponse<AdmissionMethod>>(
      `${ENDPOINT}/${id}`
    );
    return response;
  },

  /**
   * Lấy danh sách phương thức tuyển sinh theo năm học
   * @param academicYear Năm học cần lấy phương thức tuyển sinh
   * @returns Promise với danh sách phương thức tuyển sinh của năm học
   */
  getByAcademicYear: async (
    academicYear: string
  ): Promise<ApiResponse<AdmissionMethod[]>> => {
    const response = await api.get<ApiResponse<AdmissionMethod[]>>(ENDPOINT, {
      params: { academicYear },
    });
    return response;
  },

  /**
   * Tạo phương thức tuyển sinh mới
   * @param admissionMethodData Dữ liệu phương thức tuyển sinh
   * @returns Promise với phương thức tuyển sinh đã tạo
   */
  create: async (
    admissionMethodData: Omit<AdmissionMethod, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<AdmissionMethod>> => {
    const response = await api.post<ApiResponse<AdmissionMethod>>(
      ENDPOINT,
      admissionMethodData
    );
    return response;
  },

  /**
   * Cập nhật phương thức tuyển sinh
   * @param id ID của phương thức tuyển sinh
   * @param updateData Dữ liệu cập nhật
   * @returns Promise với phương thức tuyển sinh đã cập nhật
   */
  update: async (
    id: string,
    updateData: Partial<AdmissionMethod>
  ): Promise<ApiResponse<AdmissionMethod>> => {
    const response = await api.put<ApiResponse<AdmissionMethod>>(
      `${ENDPOINT}/${id}`,
      updateData
    );
    return response;
  },

  /**
   * Xóa phương thức tuyển sinh
   * @param id ID của phương thức tuyển sinh
   * @returns Promise void
   */
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`${ENDPOINT}/${id}`);
    return response;
  },
};
