import type { LoaderFunction } from 'react-router-dom';
import { majorsApi } from '@/api/resources/majors';
import type { MajorsLoaderResponse } from '@/types/loaders/major';

/**
 * Loader cho majors route
 */
export const loadMajorsData: LoaderFunction = async (): Promise<MajorsLoaderResponse> => {
  try {
    // Gọi API để lấy dữ liệu ngành học
    const response = await majorsApi.getAll();
    
    // Kiểm tra và log dữ liệu trả về để debug
    console.log('API response:', response);
    
    // Trả về dữ liệu từ API
    if (response && response.data) {
      return { 
        data: {
          // Đảm bảo cấu trúc dữ liệu đúng với PaginatedResponse<Major>
          items: Array.isArray(response.data) ? response.data : [],
          total: Array.isArray(response.data) ? response.data.length : 0,
          page: 1,
          limit: 10,
          totalPages: Math.ceil((Array.isArray(response.data) ? response.data.length : 0) / 10)
        },
        status: 'success'
      };
    }
    
    return { 
      data: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      },
      status: 'error',
      error: 'Không có dữ liệu'
    };
  } catch (error) {
    console.error('Error loading majors:', error);
    return { 
      data: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      },
      status: 'error',
      error: 'Lỗi khi tải dữ liệu ngành học'
    };
  }
};
