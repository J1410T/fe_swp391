import type { RouteObject } from 'react-router-dom';
import { loadDormitoriesData } from './loader';
import Dormitories from '@/pages/Dormitories';

/**
 * Đường dẫn đến trang quản lý ký túc xá
 * Sử dụng as const để đảm bảo type là string literal thay vì string
 */
export const DORMITORIES_ROUTE = '/dormitories' as const;

/**
 * Cấu hình route cho trang quản lý ký túc xá
 * Bao gồm path, component và loader function
 */
export const dormitoriesRoute: RouteObject = {
  path: 'dormitories',
  element: <Dormitories />,
  loader: loadDormitoriesData,
};
