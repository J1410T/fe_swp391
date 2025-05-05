/**
 * API cho Dashboard
 */

import { api } from '@/api/base';
import type { ApiResponse } from '@/types';

// Types for dashboard data
export interface OverallStats {
  total_majors: number;
  total_campuses: number;
  total_dormitories: number;
  total_scholarships: number;
  total_admission_methods: number;
  total_sessions: number;
  total_users: number;
}

export interface UserStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  admin_count: number;
  staff_count: number;
}

export interface PlatformStats {
  platform: string;
  session_count: number;
  percentage: number;
}

export interface AcademicYearStats {
  year: number;
  major_count: number;
  admission_count: number;
}

export interface SessionDateStats {
  date: string;
  count: number;
}

/**
 * API cho Dashboard
 */
export const dashboardApi = {
  /**
   * Lấy thống kê tổng quan
   * @returns Promise với thống kê tổng quan
   */
  getOverallStats: async (): Promise<ApiResponse<OverallStats>> => {
    return api.get<ApiResponse<OverallStats>>('/dashboard/stats');
  },

  /**
   * Lấy thống kê người dùng
   * @returns Promise với thống kê người dùng
   */
  getUserStats: async (): Promise<ApiResponse<UserStats>> => {
    return api.get<ApiResponse<UserStats>>('/dashboard/users');
  },

  /**
   * Lấy thống kê theo nền tảng
   * @returns Promise với thống kê theo nền tảng
   */
  getPlatformStats: async (): Promise<ApiResponse<PlatformStats[]>> => {
    return api.get<ApiResponse<PlatformStats[]>>('/dashboard/platforms');
  },

  /**
   * Lấy thống kê theo năm học
   * @returns Promise với thống kê theo năm học
   */
  getAcademicYearStats: async (): Promise<ApiResponse<AcademicYearStats[]>> => {
    return api.get<ApiResponse<AcademicYearStats[]>>('/dashboard/academic-years');
  },

  /**
   * Lấy thống kê phiên theo ngày
   * @param startDate Ngày bắt đầu (optional)
   * @param endDate Ngày kết thúc (optional)
   * @returns Promise với thống kê phiên theo ngày
   */
  getSessionStats: async (
    startDate?: string,
    endDate?: string
  ): Promise<ApiResponse<SessionDateStats[]>> => {
    const params: Record<string, string> = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return api.get<ApiResponse<SessionDateStats[]>>('/dashboard/sessions', { params });
  },
};
