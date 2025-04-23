import type { RouteObject } from 'react-router-dom';
import { loadScholarshipsData } from './loader';
import Scholarships from '@/pages/Scholarships';

/**
 * Đường dẫn đến trang quản lý học bổng
 * Sử dụng as const để đảm bảo type là string literal thay vì string
 */
export const SCHOLARSHIPS_ROUTE = '/scholarships' as const;

/**
 * Cấu hình route cho trang quản lý học bổng
 * Bao gồm path, component và loader function
 */
export const scholarshipsRoute: RouteObject = {
  path: 'scholarships',
  element: <Scholarships />,
  loader: loadScholarshipsData,
  handle: {
    breadcrumb: "Học bổng"
  }
};
