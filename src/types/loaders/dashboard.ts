import type { BaseLoaderResponse } from '../common';

/**
 * Thống kê tổng quan
 */
export interface DashboardStats {
  /** Tổng số ngành học */
  totalMajors: number;
  /** Tổng số cơ sở */
  totalCampuses: number;
  /** Tổng số phương thức tuyển sinh */
  totalAdmissionMethods: number;
  /** Tổng số học bổng */
  totalScholarships: number;
  /** Tổng số ký túc xá */
  totalDormitories: number;
}

/**
 * Dữ liệu tổng quan
 */
export interface DashboardData {
  /** Thống kê tổng quan */
  stats: DashboardStats;
}

/**
 * Response từ loader cho dashboard
 */
export interface DashboardLoaderResponse extends BaseLoaderResponse<DashboardData> {
  // Có thể thêm các trường đặc biệt nếu cần
}
