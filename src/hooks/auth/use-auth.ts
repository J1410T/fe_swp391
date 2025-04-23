import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth-service';
import type { User, LoginCredentials, RegisterData } from '@/types/entities/user';

/**
 * Hook để quản lý authentication state
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Đăng nhập
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await authService.login(credentials);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Đăng ký
   */
  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await authService.register(data);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng ký thất bại';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Đăng xuất
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Kiểm tra người dùng có quyền admin hay không
   */
  const isAdmin = useCallback(() => {
    return user?.role === 'admin';
  }, [user]);

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        setUser(authService.getUser());
      } else {
        // Thử refresh token nếu có
        const refreshToken = authService.getRefreshToken();
        if (refreshToken) {
          try {
            await authService.refreshToken();
            setIsAuthenticated(true);
            setUser(authService.getUser());
          } catch (err) {
            console.error('Token refresh error:', err);
          }
        }
      }
    };
    
    checkAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    login,
    register,
    logout
  };
}
