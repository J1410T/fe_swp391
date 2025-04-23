import type { BaseLoaderResponse } from '../common';
import type { Dormitory } from '../entities/dormitory';

/**
 * Response từ loader cho dormitories
 */
export interface DormitoriesLoaderResponse extends BaseLoaderResponse<Dormitory[]> {
  // Có thể thêm các trường đặc biệt nếu cần
}

/**
 * Response từ loader cho dormitory detail
 */
export interface DormitoryDetailLoaderResponse extends BaseLoaderResponse<Dormitory> {
  // Có thể thêm các trường đặc biệt nếu cần
}
