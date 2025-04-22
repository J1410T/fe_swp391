import { RouteObject } from 'react-router-dom';
import Users from '@/pages/Users';

/**
 * Users management route configuration
 */
export const usersRoute: RouteObject = {
  path: 'users',
  element: <Users />,
};
