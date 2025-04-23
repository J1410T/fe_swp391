import type { LoaderFunction } from 'react-router-dom';
import { scholarshipsApi } from '@/api/resources/scholarships';
import type { ScholarshipsLoaderResponse } from '@/types/loaders/scholarship';
import type { Scholarship } from '@/types/entities/scholarship';

/**
 * Loader cho scholarships route
 */
export const loadScholarshipsData: LoaderFunction = async (): Promise<ScholarshipsLoaderResponse> => {
  try {
    // Trong môi trường thực tế, đây sẽ là API call
    // Hiện tại chỉ trả về mảng rỗng để test
    await scholarshipsApi.getAll();
    
    // Trong môi trường thực tế, sẽ lấy dữ liệu từ response.data.items
    // Hiện tại chỉ trả về mảng rỗng để test
    const scholarships: Scholarship[] = [];
    
    return { 
      data: scholarships,
      status: 'success'
    };
  } catch (error) {
    console.error('Error loading scholarships:', error);
    return { 
      data: [],
      status: 'error',
      error: 'Failed to load scholarships'
    };
  }
};
