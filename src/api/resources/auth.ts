import { api } from '../base';

/**
 * Định nghĩa kiểu dữ liệu cho thông tin người dùng
 */
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
}

/**
 * Định nghĩa kiểu dữ liệu cho response đăng nhập
 */
export interface LoginResponse {
  data: {
    user: User;
    token: string;
    refreshToken?: string; // Thêm refreshToken nếu API hỗ trợ
  };
  message: string;
  success: boolean;
  timestamp: string;
}

/**
 * Định nghĩa kiểu dữ liệu cho response refresh token
 */
export interface RefreshTokenResponse {
  data: {
    token: string;
    refreshToken?: string;
  };
  success: boolean;
  message?: string;
}

/**
 * Định nghĩa kiểu dữ liệu cho request đăng nhập
 */
export interface LoginRequest {
  username: string;
  password: string;
}

// Thời gian token hết hạn (milliseconds)
const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 ngày để đảm bảo phiên đăng nhập dài hơn

/**
 * API xác thực
 */
export const authApi = {
  /**
   * Đăng nhập và lấy token JWT
   * @param username Tên đăng nhập
   * @param password Mật khẩu
   * @returns Promise với thông tin đăng nhập
   */
  login: (username: string, password: string) => {
    return api.post<LoginResponse>('/auth/login', { username, password });
  },
  
  /**
   * Kiểm tra token hiện tại có hợp lệ không
   * @returns Promise với thông tin người dùng nếu token hợp lệ
   */
  validateToken: () => {
    return api.get<{ data: { user: User }, success: boolean }>('/auth/me');
  },
  
  /**
   * Làm mới token sử dụng refresh token hoặc token hiện tại
   * @returns Promise với token mới
   */
  refreshToken: () => {
    const refreshToken = getRefreshToken();
    const currentToken = getToken();
    
    // Nếu có refresh token, sử dụng nó
    if (refreshToken) {
      return api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
    }
    
    // Nếu không có refresh token nhưng có token hiện tại, dùng token hiện tại để xác thực
    if (currentToken) {
      // Trong trường hợp API không hỗ trợ refresh token, trả về một fake response với token hiện tại
      // để duy trì luồng xác thực
      return Promise.resolve<RefreshTokenResponse>({
        data: {
          token: currentToken,
          refreshToken: undefined
        },
        success: true
      });
    }
    
    return Promise.reject(new Error('No token available'));
  },
  
  /**
   * Đăng xuất
   * @returns Promise với kết quả đăng xuất
   */
  logout: () => {
    return api.post<{ success: boolean, message: string }>('/auth/logout');
  }
};

/**
 * Lưu token vào localStorage với thời gian hết hạn
 * @param token Token JWT
 */
export const saveToken = (token: string): void => {
  if (!token) return;
  
  const tokenData = {
    value: token,
    expiry: Date.now() + TOKEN_EXPIRY_TIME
  };
  localStorage.setItem('auth_token', JSON.stringify(tokenData));
};

/**
 * Lưu refresh token vào localStorage
 * @param refreshToken Refresh token
 */
export const saveRefreshToken = (refreshToken: string): void => {
  if (!refreshToken) return;
  localStorage.setItem('auth_refresh_token', refreshToken);
};

/**
 * Lấy token từ localStorage, kiểm tra hết hạn
 * @returns Token JWT hoặc null nếu không có hoặc đã hết hạn
 */
export const getToken = (): string | null => {
  const tokenData = localStorage.getItem('auth_token');
  if (!tokenData) return null;
  
  try {
    const { value, expiry } = JSON.parse(tokenData);
    
    // Kiểm tra token đã hết hạn chưa
    if (Date.now() > expiry) {
      // Token đã hết hạn, xóa khỏi localStorage
      console.log('Token đã hết hạn, xóa khỏi localStorage');
      removeToken();
      return null;
    }
    
    return value;
  } catch (error) {
    // Nếu có lỗi khi parse, có thể token đang ở định dạng cũ
    // Xóa token không hợp lệ
    console.error('Lỗi khi parse token:', error);
    removeToken();
    return null;
  }
};

/**
 * Lấy refresh token từ localStorage
 * @returns Refresh token hoặc null nếu không có
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('auth_refresh_token');
};

/**
 * Xóa token khỏi localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

/**
 * Xóa refresh token khỏi localStorage
 */
export const removeRefreshToken = (): void => {
  localStorage.removeItem('auth_refresh_token');
};

/**
 * Lưu thông tin người dùng vào localStorage
 * @param user Thông tin người dùng
 */
export const saveUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('auth_user');
  }
};

/**
 * Lấy thông tin người dùng từ localStorage
 * @returns Thông tin người dùng hoặc null nếu không có
 */
export const getUser = (): User | null => {
  const userJson = localStorage.getItem('auth_user');
  if (!userJson || userJson === 'undefined') return null;
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Failed to parse user data:', error);
    // Xóa dữ liệu không hợp lệ
    localStorage.removeItem('auth_user');
    return null;
  }
};

/**
 * Xóa thông tin người dùng khỏi localStorage
 */
export const removeUser = (): void => {
  localStorage.removeItem('auth_user');
};

/**
 * Xóa tất cả thông tin xác thực
 */
export const clearAuth = (): void => {
  removeToken();
  removeRefreshToken();
  removeUser();
};

/**
 * Kiểm tra người dùng đã đăng nhập chưa
 * @returns true nếu đã đăng nhập, false nếu chưa
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  const user = getUser();
  const isLoggedInSession = sessionStorage.getItem('isLoggedIn') === 'true';
  
  // Phải có cả token, user và session để coi là đã đăng nhập
  return !!token && !!user && isLoggedInSession;
};

/**
 * Kiểm tra người dùng có quyền admin không
 * @returns true nếu có quyền admin, false nếu không
 */
export const isAdmin = (): boolean => {
  const user = getUser();
  return !!user && user.role === 'admin';
};

/**
 * Kiểm tra người dùng có quyền staff không
 * @returns true nếu có quyền staff, false nếu không
 */
export const isStaff = (): boolean => {
  const user = getUser();
  return !!user && (user.role === 'staff' || user.role === 'admin');
};