import { RouteObject } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';

/**
 * Dashboard route configuration
 */
export const dashboardRoute: RouteObject = {
  path: 'dashboard',
  element: <Dashboard />,
};
