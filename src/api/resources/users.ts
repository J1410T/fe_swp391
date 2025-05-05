/**
 * API cho quản lý người dùng
 */

import { api } from '../base';
import type { ApiResponse } from '@/types';
import { User } from './auth';

/**
 * Định nghĩa kiểu dữ liệu cho request tạo người dùng mới
 */
export interface UserCreateRequest {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'staff';
  is_active?: boolean;
}

/**
 * Định nghĩa kiểu dữ liệu cho request cập nhật người dùng
 */
export interface UserUpdateRequest {
  username?: string;
  password?: string;
  email?: string;
  role?: 'admin' | 'staff';
  is_active?: boolean;
}

/**
 * Định nghĩa kiểu dữ liệu cho response người dùng
 */
export interface UserResponse {
  data: User;
  message: string;
  success: boolean;
  timestamp: string;
}

/**
 * Định nghĩa kiểu dữ liệu cho response danh sách người dùng
 */
export interface UserListResponse {
  data: User[];
  message: string;
  success: boolean;
  timestamp: string;
}

/**
 * API cho quản lý người dùng
 */
export const usersApi = {
  /**
   * Kiểm tra tên đăng nhập đã tồn tại hay chưa
   * @param username Tên đăng nhập cần kiểm tra
   * @returns Promise với kết quả kiểm tra (true nếu đã tồn tại, false nếu chưa)
   */
  checkUsernameExists: async (username: string): Promise<boolean> => {
    try {
      // Sử dụng API getAll với tham số lọc theo username
      const response = await api.get<UserListResponse>('/auth/users', {
        params: { username }
      });

      // Nếu có kết quả trả về và có ít nhất một người dùng, tên đăng nhập đã tồn tại
      return response.success && response.data && response.data.length > 0;
    } catch (error) {
      console.error('Error checking username existence:', error);
      // Trong trường hợp có lỗi, trả về false để không chặn người dùng
      return false;
    }
  },

  /**
   * Kiểm tra email đã tồn tại hay chưa
   * @param email Email cần kiểm tra
   * @returns Promise với kết quả kiểm tra (true nếu đã tồn tại, false nếu chưa)
   */
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      // Sử dụng API getAll với tham số lọc theo email
      const response = await api.get<UserListResponse>('/auth/users', {
        params: { email }
      });

      // Nếu có kết quả trả về và có ít nhất một người dùng, email đã tồn tại
      return response.success && response.data && response.data.length > 0;
    } catch (error) {
      console.error('Error checking email existence:', error);
      // Trong trường hợp có lỗi, trả về false để không chặn người dùng
      return false;
    }
  },

  /**
   * Lấy danh sách người dùng
   * @param params Tham số lọc (username, email, role, is_active)
   * @returns Promise với danh sách người dùng
   */
  getAll: async (params?: {
    username?: string;
    email?: string;
    role?: 'admin' | 'staff';
    is_active?: boolean;
  }): Promise<UserListResponse> => {
    try {
      return await api.get<UserListResponse>('/auth/users', { params });
    } catch (error) {
      console.error('Error fetching users list:', error);

      // Format error for better display
      if (error instanceof Error) {
        // If it's already an Error object, rethrow it
        throw error;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract message from error object
        const errorObj = error as any;
        if (errorObj.response?.data?.message) {
          throw new Error(errorObj.response.data.message);
        } else if (errorObj.message) {
          throw new Error(errorObj.message);
        }
      }

      // Default error message
      throw new Error('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
    }
  },

  /**
   * Lấy thông tin người dùng theo ID
   * @param id ID của người dùng
   * @returns Promise với thông tin người dùng
   */
  getById: async (id: number): Promise<UserResponse> => {
    try {
      return await api.get<UserResponse>(`/auth/users/${id}`);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);

      // Format error for better display
      if (error instanceof Error) {
        // If it's already an Error object, rethrow it
        throw error;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract message from error object
        const errorObj = error as any;
        if (errorObj.response?.data?.message) {
          throw new Error(errorObj.response.data.message);
        } else if (errorObj.message) {
          throw new Error(errorObj.message);
        }
      }

      // Default error message
      throw new Error(`Không thể tải thông tin người dùng với ID: ${id}. Vui lòng thử lại sau.`);
    }
  },

  /**
   * Tạo người dùng mới
   * @param data Dữ liệu người dùng mới
   * @returns Promise với thông tin người dùng đã tạo
   */
  create: async (data: UserCreateRequest): Promise<UserResponse> => {
    try {
      // Make sure is_active is explicitly included as a boolean
      const createData = { ...data };

      // Handle is_active according to API spec (default is true)
      if (typeof data.is_active !== 'undefined') {
        // Convert to boolean explicitly
        createData.is_active = data.is_active !== false;
      } else {
        // Default to true as per API spec
        createData.is_active = true;
      }

      console.log('Creating user with data:', createData);
      const response = await api.post<UserResponse>('/auth/users', createData);
      console.log('Create response:', response);

      return response;
    } catch (error) {
      console.error('Error creating user:', error);

      // Format error for better display
      if (error instanceof Error) {
        // If it's already an Error object, rethrow it
        throw error;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract message from error object
        const errorObj = error as any;
        if (errorObj.response?.data?.message) {
          throw new Error(errorObj.response.data.message);
        } else if (errorObj.message) {
          throw new Error(errorObj.message);
        }
      }

      // Default error message
      throw new Error(`Không thể tạo người dùng. Vui lòng thử lại sau.`);
    }
  },

  /**
   * Cập nhật thông tin người dùng
   * @param id ID của người dùng
   * @param data Dữ liệu cập nhật
   * @returns Promise với thông tin người dùng đã cập nhật
   */
  update: async (id: number, data: UserUpdateRequest): Promise<UserResponse> => {
    try {
      // Make sure is_active is explicitly included as a boolean
      const updateData = { ...data };

      // Handle is_active according to API spec
      if (typeof data.is_active !== 'undefined') {
        // Convert to boolean explicitly
        updateData.is_active = data.is_active !== false;
      }

      console.log(`Updating user ${id} with data:`, updateData);

      // Make the API call
      const response = await api.put<UserResponse>(`/auth/users/${id}`, updateData);
      console.log(`Update response for user ${id}:`, response);

      return response;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);

      // Format error for better display
      if (error instanceof Error) {
        // If it's already an Error object, rethrow it
        throw error;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract message from error object
        const errorObj = error as any;
        if (errorObj.response?.data?.message) {
          throw new Error(errorObj.response.data.message);
        } else if (errorObj.message) {
          throw new Error(errorObj.message);
        }
      }

      // Default error message
      throw new Error(`Không thể cập nhật người dùng với ID: ${id}. Vui lòng thử lại sau.`);
    }
  },

  /**
   * Xóa người dùng
   * @param id ID của người dùng
   * @param soft Xóa mềm (vô hiệu hóa) hoặc xóa cứng
   * @returns Promise với kết quả xóa
   */
  delete: async (id: number, soft: boolean = false): Promise<ApiResponse<void>> => {
    try {
      console.log(`Deleting user with ID: ${id}, soft delete: ${soft}`);

      // Use the params object to pass the soft parameter
      const params = { soft: soft.toString() };
      console.log(`Delete params:`, params);

      // Make the API call with params
      const response = await api.delete<ApiResponse<void>>(`/auth/users/${id}`, params);
      console.log(`Delete response for user ${id}:`, response);

      return response;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);

      // Format error for better display
      if (error instanceof Error) {
        // If it's already an Error object, rethrow it
        throw error;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract message from error object
        const errorObj = error as any;
        if (errorObj.response?.data?.message) {
          throw new Error(errorObj.response.data.message);
        } else if (errorObj.message) {
          throw new Error(errorObj.message);
        }
      }

      // Default error message
      throw new Error(`Không thể xóa người dùng với ID: ${id}. Vui lòng thử lại sau.`);
    }
  }
};
