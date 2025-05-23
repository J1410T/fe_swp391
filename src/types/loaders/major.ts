import type { BaseLoaderResponse } from '../common';
import type { Major } from '../entities/major';
import type { PaginatedResponse } from '../api';

/**
 * Response từ loader cho majors
 */
export interface MajorsLoaderResponse extends BaseLoaderResponse<PaginatedResponse<Major>> {
  // Có thể thêm các trường đặc biệt nếu cần
}

/**
 * Response từ loader cho major detail
 */
export interface MajorDetailLoaderResponse extends BaseLoaderResponse<Major> {
  // Có thể thêm các trường đặc biệt nếu cần
}
