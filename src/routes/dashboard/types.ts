/**
 * Dashboard data model
 */
export interface DashboardData {
  stats: {
    totalMajors: number;
    totalCampuses: number;
    totalScholarships: number;
    totalDormitories: number;
  };
}

/**
 * Dashboard loader response type
 */
export interface DashboardLoaderResponse {
  data: DashboardData;
}