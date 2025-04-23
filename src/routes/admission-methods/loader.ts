import type { LoaderFunction } from 'react-router-dom';
import { admissionMethodsApi } from '@/api/resources/admission-methods';
import type { AdmissionMethodsLoaderResponse } from '@/types/loaders/admission-method';
import type { AdmissionMethod } from '@/types/entities/admission-method';

/**
 * Loader cho admission-methods route
 */
export const loadAdmissionMethodsData: LoaderFunction = async (): Promise<AdmissionMethodsLoaderResponse> => {
  try {
    // Trong môi trường thực tế, đây sẽ là API call
    // Hiện tại chỉ trả về mảng rỗng để test
    await admissionMethodsApi.getAll();
    
    // Trong môi trường thực tế, sẽ lấy dữ liệu từ response.data.items
    // Hiện tại chỉ trả về mảng rỗng để test
    const admissionMethods: AdmissionMethod[] = [];
    
    return { 
      data: admissionMethods,
      status: 'success'
    };
  } catch (error) {
    console.error('Error loading admission methods:', error);
    return { 
      data: [],
      status: 'error',
      error: 'Failed to load admission methods'
    };
  }
};
