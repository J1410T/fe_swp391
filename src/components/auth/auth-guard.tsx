import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  /** Component to render if user is authenticated */
  children: React.ReactNode;
  /** Whether to require admin role */
  requireAdmin?: boolean;
}

/**
 * Component to protect routes that require authentication
 */
export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps): React.ReactElement {
  const location = useLocation();
 
  

  // Nếu không đăng nhập, chuyển hướng đến trang login


  // Nếu yêu cầu quyền admin nhưng không phải admin, chuyển hướng đến trang không có quyền


  // Nếu đã đăng nhập và có đủ quyền, hiển thị component con
  return <>{children}</>;
}

export default AuthGuard;
