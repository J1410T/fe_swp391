/**
 * Các type chung cho API
 */

/**
 * Response cơ bản từ API
 */
export interface ApiResponse<TData> {
  data: TData;
  message?: string;
  status: number;
}

/**
 * Error từ API
 */
export interface ApiError {
  message: string;
  code: string;
  status: number;
}

/**
 * Params cho phân trang
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Response phân trang
 */
export interface PaginatedResponse<TItem> {
  items: TItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Params cho sắp xếp
 */
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Params cho lọc
 */
export interface FilterParams {
  [key: string]: string | number | boolean | null;
}
