import type { LoaderFunction } from 'react-router-dom';
import type { DormitoriesLoaderResponse } from '@/types/loaders/dormitory';
import type { Dormitory } from '@/types/entities/dormitory';

/**
 * Loader cho dormitories route
 */
export const loadDormitoriesData: LoaderFunction = async (): Promise<DormitoriesLoaderResponse> => {
  try {
    // Trong môi trường thực tế, đây sẽ là API call
    // Hiện tại chỉ trả về mảng rỗng để test
    const dormitories: Dormitory[] = [];
    
    return { 
      data: dormitories,
      status: 'success'
    };
  } catch (error) {
    console.error('Error loading dormitories:', error);
    return { 
      data: [],
      status: 'error',
      error: 'Failed to load dormitories'
    };
  }
};
