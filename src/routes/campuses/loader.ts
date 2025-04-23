import type { LoaderFunction } from 'react-router-dom';
import { campusesApi } from '@/api/resources/campuses';
import type { CampusesLoaderResponse } from '@/types/loaders/campus';
import type { Campus } from '@/types/entities/campus';

/**
 * Loader cho campuses route
 */
export const loadCampusesData: LoaderFunction = async (): Promise<CampusesLoaderResponse> => {
  try {
    // Trong môi trường thực tế, đây sẽ là API call
    // Hiện tại chỉ trả về mảng rỗng để test
    await campusesApi.getAll();
    
    // Trong môi trường thực tế, sẽ lấy dữ liệu từ response.data.items
    // Hiện tại chỉ trả về mảng rỗng để test
    const campuses: Campus[] = [];
    
    return { 
      data: campuses,
      status: 'success'
    };
  } catch (error) {
    console.error('Error loading campuses:', error);
    return { 
      data: [],
      status: 'error',
      error: 'Failed to load campuses'
    };
  }
};
