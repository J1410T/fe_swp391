import apiService from './apiService';

export interface LoginResponse {
  id: string;
  userName: string;
  passwords: string;
  role: string;
  createdAt: string;
}

export interface LoginCredentials {
  userName: string;
  passwords: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

const AUTH_ENDPOINTS = {
  LOGIN: import.meta.env.VITE_API_LOGIN_ENDPOINT || '/api/Login',
};

console.log('Auth endpoints:', AUTH_ENDPOINTS);

export const authService = {
  /**
   * Thực hiện đăng nhập người dùng
   * @param credentials Thông tin đăng nhập (tên đăng nhập và mật khẩu)
   * @returns Promise chứa thông tin người dùng nếu đăng nhập thành công
   */
  login: async (credentials: LoginCredentials): Promise<User | null> => {
    try {
      console.log('Login credentials:', credentials);
      console.log('API endpoint:', AUTH_ENDPOINTS.LOGIN);
      
      // Lấy danh sách tất cả người dùng từ API
      const response = await apiService.get<LoginResponse[]>(AUTH_ENDPOINTS.LOGIN);
      
      console.log('API response data:', response.data);
      
      // Tìm người dùng khớp với thông tin đăng nhập
      const user = response.data.find(
        (user) => {
          console.log('Comparing:', { 
            inputUserName: credentials.userName, 
            apiUserName: user.userName,
            inputPassword: credentials.passwords,
            apiPassword: user.passwords
          });
          return user.userName === credentials.userName && 
                 user.passwords === credentials.passwords;
        }
      );
      
      console.log('Found user:', user);
      
      if (!user) {
        console.log('No matching user found');
        return null;
      }
      
      // Chuyển đổi dữ liệu người dùng sang định dạng User
      const authenticatedUser: User = {
        id: user.id,
        username: user.userName,
        role: user.role
      };
      
      // Lưu token (trong trường hợp thực tế sẽ nhận từ server)
      // Ở đây chỉ là giả lập token đơn giản
      const mockToken = btoa(`${user.id}:${user.userName}:${Date.now()}`);
      localStorage.setItem('token', mockToken);
      
      return authenticatedUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  /**
   * Đăng xuất người dùng
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  /**
   * Kiểm tra xem người dùng đã đăng nhập hay chưa
   * @returns Thông tin người dùng nếu đã đăng nhập, null nếu chưa
   */
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Failed to parse stored user data', error);
      return null;
    }
  },
  
  /**
   * Kiểm tra xem token có tồn tại không
   * @returns true nếu token tồn tại, false nếu không
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
