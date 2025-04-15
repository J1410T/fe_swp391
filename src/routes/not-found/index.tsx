import { RouteObject } from 'react-router-dom';
import { NotFound } from '@/pages/NotFound';

export const NOT_FOUND_ROUTE = '*' as const;

export const notFoundRoute: RouteObject = {
  path: NOT_FOUND_ROUTE,
  element: <NotFound />,
}; 