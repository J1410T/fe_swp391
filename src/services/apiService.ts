import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Tạo instance axios với cấu hình mặc định
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', baseURL);

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout 10 giây
});

// Interceptor xử lý request
apiClient.interceptors.request.use(
  (config) => {
    // Có thể thêm token vào header nếu cần
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý response
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi chung
    if (error.response) {
      // Lỗi từ server với status code
      console.error('API Error:', error.response.status, error.response.data);
      
      // Xử lý lỗi 401 Unauthorized
      if (error.response.status === 401) {
        // Có thể logout hoặc refresh token ở đây
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Không nhận được response
      console.error('Network Error:', error.request);
    } else {
      // Lỗi khi setup request
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Định nghĩa các hàm helper để gọi API
export const apiService = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  }
};

export default apiService;
