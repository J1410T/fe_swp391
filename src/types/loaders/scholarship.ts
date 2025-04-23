import type { BaseLoaderResponse } from '../common';
import type { Scholarship } from '../entities/scholarship';

/**
 * Response từ loader cho scholarships
 */
export interface ScholarshipsLoaderResponse extends BaseLoaderResponse<Scholarship[]> {
  // Có thể thêm các trường đặc biệt nếu cần
}

/**
 * Response từ loader cho scholarship detail
 */
export interface ScholarshipDetailLoaderResponse extends BaseLoaderResponse<Scholarship> {
  // Có thể thêm các trường đặc biệt nếu cần
}
