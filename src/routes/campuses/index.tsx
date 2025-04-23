import type { RouteObject } from 'react-router-dom';
import { loadCampusesData } from './loader';
import Campuses from '@/pages/Campuses';

/**
 * Đường dẫn đến trang quản lý cơ sở
 * Sử dụng as const để đảm bảo type là string literal thay vì string
 */
export const CAMPUSES_ROUTE = '/campuses' as const;

/**
 * Cấu hình route cho trang quản lý cơ sở
 * Bao gồm path, component và loader function
 */
export const campusesRoute: RouteObject = {
  path: 'campuses',
  element: <Campuses />,
  loader: loadCampusesData,
  handle: {
    breadcrumb: "Cơ sở"
  }
};
