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
  async fetch<TData>(endpoint: string): Promise<TData> {
    // Giả lập delay mạng
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as TData;
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
