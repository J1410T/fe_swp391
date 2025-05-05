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
    return api.get<UserListResponse>('/auth/users', { params });
  },

  /**
   * Lấy thông tin người dùng theo ID
   * @param id ID của người dùng
   * @returns Promise với thông tin người dùng
   */
  getById: async (id: number): Promise<UserResponse> => {
    return api.get<UserResponse>(`/auth/users/${id}`);
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }
};
