/**
 * API utility cơ bản với hỗ trợ Suspense
 */

import { createResource, type Resource } from '@/utils/suspense';


/**
 * API client cơ bản
 */
export const api = {
  /**
   * Gọi API và trả về dữ liệu
   * @param endpoint Endpoint API
   * @returns Promise với dữ liệu
   */
  async fetch<TData>(endpoint: string, options: RequestInit = {}): Promise<TData> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
  /**
   * Tạo resource cho Suspense
   * @param endpoint Endpoint API
   * @returns Resource cho Suspense
   */
  createResource<TData>(endpoint: string): Resource<TData> {
    const promise = this.fetch<TData>(endpoint);
    return createResource(promise);
  }
};
