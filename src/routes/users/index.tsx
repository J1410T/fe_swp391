import type { RouteObject } from 'react-router-dom';
import Users from '@/pages/Users';
import { AuthGuard } from '@/components/auth/auth-guard';

/**
 * Đường dẫn đến trang quản lý người dùng
 * Sử dụng as const để đảm bảo type là string literal thay vì string
 */
export const USERS_ROUTE = '/users' as const;

/**
 * Cấu hình route cho trang quản lý người dùng
 * Bao gồm path, component và yêu cầu quyền admin
 */
export const usersRoute: RouteObject = {
  path: 'users',
  element: (
    <AuthGuard requireAdmin>
      <Users />
    </AuthGuard>
  ),
  handle: {
    breadcrumb: "Người dùng"
  }
};

export default usersRoute;
