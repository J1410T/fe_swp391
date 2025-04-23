import type { BaseLoaderResponse } from '../common';
import type { Campus } from '../entities/campus';

/**
 * Response từ loader cho campuses
 */
export interface CampusesLoaderResponse extends BaseLoaderResponse<Campus[]> {
  // Có thể thêm các trường đặc biệt nếu cần
}

/**
 * Response từ loader cho campus detail
 */
export interface CampusDetailLoaderResponse extends BaseLoaderResponse<Campus> {
  // Có thể thêm các trường đặc biệt nếu cần
}
