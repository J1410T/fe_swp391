import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { getToken, getUser, isAuthenticated as checkTokenValid } from '@/api/resources/auth';
// Import các hàm cần thiết từ context xác thực

interface AuthGuardProps {
  /** Component to render if user is authenticated */
  children: React.ReactNode;
  /** Whether to require admin role */
  requireAdmin?: boolean;
  /** Whether to require staff role */
  requireStaff?: boolean;
}

/**
 * Component bảo vệ các route yêu cầu xác thực
 * Sẽ chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
 * Hoặc chuyển hướng đến trang không có quyền nếu không đủ quyền
 */
export function AuthGuard({ 
  children, 
  requireAdmin = false,
  requireStaff = false 
}: AuthGuardProps): React.ReactElement {
  const location = useLocation();
  const { isAuthenticated, user, checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  // Theo dõi thời gian kiểm tra token gần nhất
  const lastTokenCheck = useRef<number>(0);
  // Thời gian tối thiểu giữa các lần kiểm tra (10 giây)
  const TOKEN_CHECK_INTERVAL = 10000;

  // Kiểm tra xác thực khi component mount và khi chuyển trang
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const currentTime = Date.now();
        // Kiểm tra nhanh xem đã có phiên trong localStorage chưa
        const token = getToken();
        const savedUser = getUser();
        const wasLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        
        // Kiểm tra token có hợp lệ không
        const tokenValid = checkTokenValid();
        
        // Nếu không có token hợp lệ hoặc không có phiên đăng nhập
        if (!tokenValid || !wasLoggedIn) {
          // Xóa phiên đăng nhập nếu có
          if (wasLoggedIn) {
            sessionStorage.removeItem('isLoggedIn');
          }
          
          // Gọi API kiểm tra xác thực nếu đã quá khoảng thời gian tối thiểu
          if (currentTime - lastTokenCheck.current > TOKEN_CHECK_INTERVAL) {
            lastTokenCheck.current = currentTime;
            await checkAuth();
          }
          setIsChecking(false);
          return;
        }
        
        // Nếu đã có thông tin hợp lệ trong localStorage
        if (token && savedUser && wasLoggedIn && tokenValid) {
          // Kiểm tra API định kỳ để đảm bảo token vẫn hợp lệ
          if (currentTime - lastTokenCheck.current > TOKEN_CHECK_INTERVAL) {
            lastTokenCheck.current = currentTime;
            // Kiểm tra ngầm (không chờ kết quả)
            checkAuth().catch(() => {
              // Nếu có lỗi, cập nhật trạng thái đăng nhập
              sessionStorage.removeItem('isLoggedIn');
              window.location.href = '/auth/login';
            });
          }
          setIsChecking(false);
          return;
        }
        
        // Nếu không có đủ thông tin hoặc thông tin không hợp lệ
        await checkAuth();
      } finally {
        setIsChecking(false);
      }
    };
    
    verifyAuth();
  }, [isAuthenticated, user, checkAuth, location.pathname]);

  // Nếu đang kiểm tra, hiển thị loader
  if (isChecking) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
    </div>;
  }

  // Nếu không đăng nhập, chuyển hướng đến trang login
  if (!isAuthenticated) {
    // Lưu đường dẫn hiện tại để chuyển hướng sau khi đăng nhập
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  // Nếu yêu cầu quyền admin nhưng không phải admin, chuyển hướng đến trang không có quyền
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu yêu cầu quyền staff nhưng không phải staff hoặc admin, chuyển hướng đến trang không có quyền
  if (requireStaff && user?.role !== 'staff' && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu đã đăng nhập và có đủ quyền, hiển thị component con
  return <>{children}</>;
}

export default AuthGuard;
