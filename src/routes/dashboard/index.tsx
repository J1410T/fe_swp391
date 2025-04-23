import { RouteObject } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { loadDashboardData } from './loader';

export const DASHBOARD_ROUTE = '/dashboard' as const;

/**
 * Cấu hình route cho trang Dashboard
 */
export const dashboardRoute: RouteObject = {
  path: 'dashboard',
  element: <Dashboard />,
  loader: loadDashboardData,
  handle: {
    breadcrumb: "Tổng quan"
  }
};
