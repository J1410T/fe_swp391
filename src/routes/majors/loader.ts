import type { LoaderFunction } from 'react-router-dom';
import { majorsApi } from '@/api/resources/majors';
import type { MajorsLoaderResponse } from '@/types/loaders/major';
import type { Major } from '@/types/entities/major';

/**
 * Loader cho majors route
 */
export const loadMajorsData: LoaderFunction = async (): Promise<MajorsLoaderResponse> => {
  try {
    // Trong môi trường thực tế, đây sẽ là API call
    // Hiện tại chỉ trả về mảng rỗng để test
    await majorsApi.getAll();
    
    // Trong môi trường thực tế, sẽ lấy dữ liệu từ response.data.items
    // Hiện tại chỉ trả về mảng rỗng để test
    const majors: Major[] = [];
    
    return { 
      data: majors,
      status: 'success'
    };
  } catch (error) {
    console.error('Error loading majors:', error);
    return { 
      data: [],
      status: 'error',
      error: 'Failed to load majors'
    };
  }
};
