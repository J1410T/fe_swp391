import type { RouteObject } from 'react-router-dom';
import Majors from '@/pages/Majors';
import { loadMajorsData } from './loader';

/**
 * Đường dẫn đến trang quản lý ngành học
 * Sử dụng as const để đảm bảo type là string literal thay vì string
 */
export const MAJORS_ROUTE = '/majors' as const;

/**
 * Cấu hình route cho trang quản lý ngành học
 * Bao gồm path, component và loader function
 */
export const majorsRoute: RouteObject = {
  path: 'majors',
  element: <Majors />,
  loader: loadMajorsData,
  handle: {
    breadcrumb: "Ngành học"
  }
};
