import { LoaderFunction } from 'react-router-dom';
import { DashboardData, DashboardLoaderResponse } from './types';
import { dashboardApi } from '@/api/resources/dashboard';

/**
 * Loads dashboard data from API
 * @returns Promise containing the dashboard page data
 */
export const loadDashboardData: LoaderFunction = async (): Promise<DashboardLoaderResponse> => {
  try {
    // Get overall stats from API
    const overallStatsResponse = await dashboardApi.getOverallStats();

    // Map API response to our loader data format
    const data: DashboardData = {
      stats: {
        totalMajors: overallStatsResponse.data.total_majors,
        totalCampuses: overallStatsResponse.data.total_campuses,
        totalScholarships: overallStatsResponse.data.total_scholarships,
        totalDormitories: overallStatsResponse.data.total_dormitories
      }
    };

    return { data };
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    throw new Error('Failed to load dashboard data');
  }
};
