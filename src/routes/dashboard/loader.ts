import { LoaderFunction } from 'react-router-dom';
import { DashboardData, DashboardLoaderResponse } from './types';

/**
 * Loads dashboard data from API
 * @returns Promise containing the dashboard page data
 */
export const loadDashboardData: LoaderFunction = async (): Promise<DashboardLoaderResponse> => {
  try {
    // Simulate API call
    const data = await new Promise<DashboardData>(resolve => 
      setTimeout(() => resolve({ 
        stats: {
          totalMajors: 24,
          totalCampuses: 5,
          totalScholarships: 18,
          totalDormitories: 12
        } 
      }), 100)
    );

    return { data };
  } catch (error) {
    throw new Error('Failed to load dashboard data');
  }
};
