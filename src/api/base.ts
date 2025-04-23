/**
 * API utility cơ bản với hỗ trợ Suspense
 */

import { createResource, type Resource } from '@/utils/suspense';
import { env } from '@/config/env';
/**
 * Interface cho tham số query
 */
export type QueryParams = Record<string, string | number | boolean | undefined | null>;

/**
 * Chuyển đổi đối tượng query params thành chuỗi URL
 */
export function buildQueryString(params: QueryParams): string {
  if (!params || Object.keys(params).length === 0) return '';
  
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * API client cơ bản
 */
export const api = {
  /**
   * Gọi API và trả về dữ liệu
   * @param endpoint Endpoint API
   * @param params Tham số query (optional)
   * @param options Tùy chọn fetch (optional)
   * @returns Promise với dữ liệu
   */
  async fetch<TData>(endpoint: string, params?: QueryParams, options: RequestInit = {}): Promise<TData> {
    const queryString = params ? buildQueryString(params) : '';
    
    // Sử dụng trực tiếp API_SERVER từ biến môi trường
    let fullUrl;
    
    if (endpoint.startsWith('http')) {
      // Nếu endpoint đã là URL đầy đủ, sử dụng trực tiếp
      fullUrl = `${endpoint}${queryString}`;
    } else {
      // Xác định đường dẫn API dựa trên endpoint
      const apiPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      
      // Sử dụng API_SERVER từ biến môi trường
      const apiBaseUrl = env.API_BASE_URL.endsWith('/') ? env.API_BASE_URL.slice(0, -1) : env.API_BASE_URL;
      const serverUrl = env.API_SERVER.endsWith('/') ? env.API_SERVER.slice(0, -1) : env.API_SERVER;
      
      // Nếu đang trong môi trường development, sử dụng proxy
      if (env.NODE_ENV === 'development') {
        // Sử dụng đường dẫn tương đối để proxy sẽ xử lý
        if (endpoint.startsWith('/api')) {
          fullUrl = `${apiPath}${queryString}`;
        } else {
          fullUrl = `${apiBaseUrl}${apiPath}${queryString}`;
        }
      } else {
        // Trong môi trường production, sử dụng API_SERVER trực tiếp
        if (endpoint.startsWith('/api')) {
          fullUrl = `${serverUrl}${apiPath}${queryString}`;
        } else {
          fullUrl = `${serverUrl}${apiBaseUrl}${apiPath}${queryString}`;
        }
      }
    }
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Phương thức GET
   * @param endpoint Endpoint API
   * @param options Tùy chọn bao gồm params và config fetch
   * @returns Promise với dữ liệu
   */
  async get<TData>(endpoint: string, options: { params?: QueryParams } = {}): Promise<TData> {
    return this.fetch<TData>(endpoint, options.params, { method: 'GET' });
  },

  /**
   * Phương thức POST
   * @param endpoint Endpoint API
   * @param data Dữ liệu gửi đi
   * @param params Tham số query (optional)
   * @returns Promise với dữ liệu
   */
  async post<TData>(endpoint: string, data?: any, params?: QueryParams): Promise<TData> {
    return this.fetch<TData>(endpoint, params, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * Phương thức PUT
   * @param endpoint Endpoint API
   * @param data Dữ liệu gửi đi
   * @param params Tham số query (optional)
   * @returns Promise với dữ liệu
   */
  async put<TData>(endpoint: string, data?: any, params?: QueryParams): Promise<TData> {
    return this.fetch<TData>(endpoint, params, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * Phương thức PATCH
   * @param endpoint Endpoint API
   * @param data Dữ liệu gửi đi
   * @param params Tham số query (optional)
   * @returns Promise với dữ liệu
   */
  async patch<TData>(endpoint: string, data?: any, params?: QueryParams): Promise<TData> {
    return this.fetch<TData>(endpoint, params, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * Phương thức DELETE
   * @param endpoint Endpoint API
   * @param params Tham số query (optional)
   * @returns Promise với dữ liệu
   */
  async delete<TData>(endpoint: string, params?: QueryParams): Promise<TData> {
    return this.fetch<TData>(endpoint, params, { method: 'DELETE' });
  },

  /**
   * Tạo resource cho Suspense
   * @param endpoint Endpoint API
   * @param params Tham số query (optional)
   * @param options Tùy chọn fetch (optional)
   * @returns Resource cho Suspense
   */
  createResource<TData>(endpoint: string, params?: QueryParams, options?: RequestInit): Resource<TData> {
    const promise = this.fetch<TData>(endpoint, params, options);
    return createResource(promise);
  }
};