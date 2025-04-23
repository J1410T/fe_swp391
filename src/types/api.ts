import type { PaginationParams, SortParams, FilterParams } from './common';

/**
 * Response phân trang
 */
export interface PaginatedResponse<T> {
  /** Danh sách items */
  items: T[];
  /** Tổng số items */
  total: number;
  /** Trang hiện tại */
  page: number;
  /** Số lượng item trên mỗi trang */
  limit: number;
  /** Tổng số trang */
  totalPages: number;
}

/**
 * Response API cơ bản
 */
export interface ApiResponse<T> {
  /** Dữ liệu trả về */
  data: T;
  /** Trạng thái thành công */
  success: boolean;
  /** Thông báo */
  message?: string;
}

/**
 * Tham số request API
 */
export type ApiRequestParams = PaginationParams & SortParams & Partial<FilterParams>;

/**
 * Tham số tạo mới
 */
export interface CreateParams<T> {
  /** Dữ liệu tạo mới */
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
}

/**
 * Tham số cập nhật
 */
export interface UpdateParams<T> {
  /** ID của item cần cập nhật */
  id: string;
  /** Dữ liệu cập nhật */
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
}

/**
 * Tham số xóa
 */
export interface DeleteParams {
  /** ID của item cần xóa */
  id: string;
}
