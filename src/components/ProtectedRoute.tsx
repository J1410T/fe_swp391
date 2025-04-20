import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

/**
 * Component bảo vệ route, kiểm tra xác thực và phân quyền
 * @param children - Nội dung của route
 * @param allowedRoles - Danh sách các role được phép truy cập (nếu không cung cấp, chỉ kiểm tra đăng nhập)
 */
const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  // Nếu có quy định về phân quyền và người dùng không có quyền truy cập
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    // Chuyển hướng đến trang mặc định dựa trên role của người dùng
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'staff') {
      return <Navigate to="/staff/dashboard" replace />;
    } else {
      // Nếu không xác định được role, chuyển về trang đăng nhập
      return <Navigate to="/auth/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;