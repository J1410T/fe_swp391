import { useEffect, useState } from 'react';
import { useLocation, useMatches } from 'react-router-dom';

/**
 * Định nghĩa cấu trúc của một breadcrumb item
 */
export interface BreadcrumbItem {
  /** Tiêu đề hiển thị */
  title: string;
  /** Đường dẫn đến trang */
  path: string;
  /** Có phải là trang hiện tại không */
  active?: boolean;
}

/**
 * Hook để lấy breadcrumb dựa trên route hiện tại
 * @returns Danh sách các breadcrumb items
 */
export function useBreadcrumb(): BreadcrumbItem[] {
  const location = useLocation();
  const matches = useMatches();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    // Lọc các route có handle.breadcrumb
    const filteredMatches = matches.filter(
      (match) => match.handle && (match.handle as any).breadcrumb
    );

    // Tạo breadcrumbs từ các route đã lọc
    const items = filteredMatches.map((match, index) => {
      const isLast = index === filteredMatches.length - 1;
      const handle = match.handle as { breadcrumb: string };
      
      return {
        title: handle.breadcrumb,
        path: match.pathname,
        active: isLast,
      };
    });

    // Thêm "Trang chủ" vào đầu nếu không có
    if (items.length > 0 && items[0].path !== '/dashboard') {
      items.unshift({
        title: 'Trang chủ',
        path: '/dashboard',
        active: false,
      });
    }

    setBreadcrumbs(items);
  }, [location.pathname, matches]);

  return breadcrumbs;
}

export default useBreadcrumb;
