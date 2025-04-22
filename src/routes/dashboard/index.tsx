import { RouteObject } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { loadDashboardData } from './loader';

export const DASHBOARD_ROUTE = '/dashboard' as const;

export const dashboardRoute: RouteObject = {
  path: 'dashboard',
  element: <Dashboard />,
  loader: loadDashboardData,
};
