import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  authApi, 
  User, 
  saveToken, 
  saveRefreshToken,
  saveUser, 
  getToken, 
  getRefreshToken,
  getUser, 
  clearAuth,
  isAuthenticated as checkIsAuthenticated 
} from '@/api/resources/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  refreshAuthToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook để sử dụng AuthContext
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider cho AuthContext
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAuthenticated());

  // Theo dõi trạng thái kiểm tra xác thực ban đầu
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  // Sử dụng useRef để lưu trạng thái đăng xuất để tránh re-render không cần thiết
  const logoutTriggered = useRef(false);
  
  /**
   * Làm mới token xác thực
   */
  const refreshAuthToken = useCallback(async (): Promise<boolean> => {
    try {
      console.log('Đang làm mới token...');
      
      // Kiểm tra xem có refresh token không
      const refreshToken = getRefreshToken();
      
      // Thử lấy token hiện tại để làm backup
      const currentToken = getToken();
      
      // Gọi API để làm mới token
      const response = await authApi.refreshToken();
      
      if (response.success) {
        console.log('Làm mới token thành công');
        const { token, refreshToken: newRefreshToken } = response.data;
        
        // Lưu token mới
        saveToken(token);
        
        // Nếu có refresh token mới, lưu lại
        if (newRefreshToken) {
          saveRefreshToken(newRefreshToken);
        }
        
        return true;
      }
      
      console.warn('Làm mới token không thành công');
      
      // Nếu có token hiện tại, tiếp tục sử dụng
      if (currentToken) {
        console.log('Sử dụng token hiện tại làm backup');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Lỗi khi làm mới token:', error);
      return false;
    }
  }, []);

  /**
   * Xử lý lỗi xác thực
   */
  const handleAuthError = useCallback(async (error: any): Promise<boolean> => {
    console.log('Xử lý lỗi xác thực:', error);
    
    // Kiểm tra cụ thể lỗi 401 để refresh token
    if (error.message && (error.message.includes('401') || error.message.includes('Authentication failed'))) {
      console.log('Lỗi xác thực 401, thử làm mới token');
      
      // Thử làm mới token
      const refreshSuccess = await refreshAuthToken();
      
      if (refreshSuccess) {
        console.log('Làm mới token thành công, tiếp tục luồng xác thực');
        // Nếu làm mới token thành công, trả về true để thử lại
        return true;
      }
    }
    
    console.log('Không thể xử lý lỗi xác thực, đăng xuất');
    
    // Nếu không phải lỗi token hoặc không thể làm mới, đăng xuất
    clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('isLoggedIn');
    
    return false;
  }, [refreshAuthToken]);

  // Lắng nghe sự kiện localStorage thay đổi để đồng bộ trạng thái đăng nhập giữa các tab
  useEffect(() => {
    // Hàm xử lý sự kiện storage thay đổi
    const handleStorageChange = (event: StorageEvent) => {
      // Chỉ xử lý khi có thay đổi liên quan đến xác thực
      if (event.key === 'auth_token' || event.key === 'auth_user' || event.key === null) {
        // Nếu token bị xóa (event.newValue === null) và trước đó đã đăng nhập
        if ((event.key === 'auth_token' && event.newValue === null) || 
            (event.key === 'auth_user' && event.newValue === null)) {
          if (isAuthenticated && !logoutTriggered.current) {
            console.log('Auth data changed in another tab, logging out');
            // Đăng xuất trong tab hiện tại
            setUser(null);
            setIsAuthenticated(false);
            sessionStorage.removeItem('isLoggedIn');
            
            // Hiển thị thông báo cho người dùng
            alert('Phiên đăng nhập của bạn đã kết thúc ở tab khác. Vui lòng đăng nhập lại.');
            
            // Chuyển hướng về trang đăng nhập
            window.location.href = '/auth/login';
          }
        }
      }
    };

    // Đăng ký lắng nghe sự kiện storage
    window.addEventListener('storage', handleStorageChange);

    // Hủy đăng ký khi component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated]);

  // Kiểm tra xác thực khi component được mount
  useEffect(() => {
    // Nếu đã kiểm tra ban đầu, không cần kiểm tra lại
    if (initialCheckDone) {
      return;
    }
    
    const initializeAuth = async () => {
      try {
        // Đánh dấu đã bắt đầu kiểm tra
        setIsLoading(true);
        
        // Kiểm tra xem có token và trạng thái đăng nhập
        const token = getToken();
        const savedUser = getUser();
        const wasLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        
        if (token && savedUser && wasLoggedIn) {
          console.log('Có sẵn thông tin xác thực, không cần kiểm tra API');
          // Đã có đầy đủ thông tin, không cần gọi API
          setUser(savedUser);
          setIsAuthenticated(true);
        } else if (token && wasLoggedIn) {
          console.log('Token hợp lệ nhưng thiếu thông tin user, thử lấy thông tin từ API');
          // Có token và phiên đăng nhập nhưng không có user, thử lấy thông tin từ API
          try {
            const response = await authApi.validateToken();
            if (response.success) {
              saveUser(response.data.user);
              setUser(response.data.user);
              setIsAuthenticated(true);
            } else {
              // API không trả về user hợp lệ, xóa thông tin xác thực
              clearAuth();
              sessionStorage.removeItem('isLoggedIn');
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error('Lỗi khi kiểm tra token:', error);
            // Lỗi khi gọi API, cố gắng làm mới token
            const refreshSuccess = await refreshAuthToken();
            if (!refreshSuccess) {
              // Không thể làm mới, xóa thông tin xác thực
              clearAuth();
              sessionStorage.removeItem('isLoggedIn');
              setIsAuthenticated(false);
            }
          }
        } else {
          
          // Không có đủ thông tin xác thực, đặt trạng thái là chưa đăng nhập
          setIsAuthenticated(false);
          
          // Nếu có refresh token, thử làm mới
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            console.log('Tìm thấy refresh token, thử làm mới');
            const refreshSuccess = await refreshAuthToken();
            if (refreshSuccess) {
              // Nếu làm mới thành công, kiểm tra user
              const currentUser = getUser();
              if (currentUser) {
                console.log('Làm mới token thành công và có thông tin user');
                setUser(currentUser);
                setIsAuthenticated(true);
                sessionStorage.setItem('isLoggedIn', 'true');
              }
            }
          }
        }
      } finally {
        // Đánh dấu đã hoàn thành kiểm tra ban đầu
        setInitialCheckDone(true);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [initialCheckDone, refreshAuthToken]);

  /**
   * Đăng nhập
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login(username, password);
      
      if (response.success) {
        const { user, token, refreshToken } = response.data;
        
        // Lưu token và thông tin người dùng
        saveToken(token);
        
        // Kiểm tra nếu có refresh token (API có thể không trả về)
        if (refreshToken) {
          saveRefreshToken(refreshToken);
        }
        
        saveUser(user);
        
        // Cập nhật state
        setUser(user);
        setIsAuthenticated(true);
        
        // Lưu trạng thái đăng nhập vào sessionStorage để tránh mất khi refresh
        sessionStorage.setItem('isLoggedIn', 'true');
        
        return true;
      } else {
        // Xử lý thông báo lỗi từ API
        let errorMsg = response.message || 'Đăng nhập không thành công';
        
        // Kiểm tra các trường hợp lỗi cụ thể
        if (errorMsg.includes('Invalid username or password')) {
          errorMsg = 'Tên đăng nhập hoặc mật khẩu không đúng';
        } else if (errorMsg.includes('User not found')) {
          errorMsg = 'Tài khoản không tồn tại';
        } else if (errorMsg.includes('Account locked')) {
          errorMsg = 'Tài khoản đã bị khóa';
        }
        
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      // Xử lý các lỗi kết nối hoặc lỗi mạng
      let errorMessage = 'Có lỗi xảy ra khi đăng nhập';
      
      if (err instanceof Error) {
        if (err.message.includes('401')) {
          // Lỗi 401 là lỗi xác thực, thường là sai mật khẩu
          errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng';
        } else if (err.message.includes('404')) {
          errorMessage = 'Không thể kết nối đến máy chủ (Lỗi 404)';
        } else if (err.message.includes('network') || err.message.includes('Network')) {
          errorMessage = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn';
        }
        else if (err.message.includes('400')) {
          errorMessage = 'Mật khẩu phải có độ dài ít nhất 6 ký tự ';
        }
        else if (err.message.includes('timeout')) {
          errorMessage = 'Máy chủ không phản hồi. Vui lòng thử lại sau';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Lỗi đăng nhập:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Đăng xuất
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      console.log('Đăng xuất...');
      // Đánh dấu đã kích hoạt đăng xuất để tránh xử lý lại sự kiện storage
      logoutTriggered.current = true;
      
      // Gọi API đăng xuất (không quan trọng kết quả)
      await authApi.logout();
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    } finally {
      console.log('Xóa thông tin xác thực');
      // Xóa tất cả thông tin xác thực
      clearAuth();
      
      // Xóa dữ liệu session
      sessionStorage.removeItem('isLoggedIn');
      
      // Cập nhật state
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      // Đặt lại cờ đăng xuất sau 1 giây
      setTimeout(() => {
        logoutTriggered.current = false;
      }, 1000);
      
      console.log('Đã đăng xuất thành công');
    }
  };

  /**
   * Kiểm tra xác thực
   */
  const checkAuth = async (): Promise<boolean> => {
    // Nếu đang xác thực, tránh gọi lại nhiều lần
    if (isLoading) {
      return isAuthenticated;
    }
    
    setIsLoading(true);
    
    try {
      // Trước tiên, kiểm tra localStorage và sessionStorage
      const wasLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      const savedUser = getUser();
      const currentToken = getToken();
      
      // Nếu có user trong localStorage và có token, coi như đã xác thực
      if (savedUser && currentToken && wasLoggedIn) {
        setUser(savedUser);
        setIsAuthenticated(true);
        return true;
      }
      
      // Nếu không có token hoặc user, xóa phiên đăng nhập
      if (!currentToken || !savedUser) {
        sessionStorage.removeItem('isLoggedIn');
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
      
      // Nếu có token, thử gọi API để xác thực (chỉ khi cần thiết)
      try {
        const response = await authApi.validateToken();
        
        if (response.success) {
          const { user } = response.data;
          
          // Cập nhật thông tin người dùng
          saveUser(user);
          setUser(user);
          setIsAuthenticated(true);
          
          // Lưu trạng thái đăng nhập
          sessionStorage.setItem('isLoggedIn', 'true');
          
          return true;
        } else {
          // Token không hợp lệ, thử làm mới
          const refreshSuccess = await refreshAuthToken();
          if (refreshSuccess) {
            // Nếu làm mới thành công, thử lại với thông tin đã lưu
            const savedUser = getUser();
            if (savedUser) {
              setUser(savedUser);
              setIsAuthenticated(true);
              return true;
            }
            return false;
          }
          
          // Không thể làm mới, đăng xuất
          clearAuth();
          sessionStorage.removeItem('isLoggedIn');
          setUser(null);
          setIsAuthenticated(false);
          
          return false;
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        
        // Xử lý lỗi xác thực
        const shouldRetry = await handleAuthError(error);
        
        if (shouldRetry) {
          // Nếu đã làm mới token thành công, tiếp tục với thông tin đã lưu
          const savedUser = getUser();
          if (savedUser) {
            setUser(savedUser);
            setIsAuthenticated(true);
            return true;
          }
        }
        
        // Lỗi xác thực, đăng xuất
        clearAuth();
        sessionStorage.removeItem('isLoggedIn');
        setUser(null);
        setIsAuthenticated(false);
        
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    refreshAuthToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
