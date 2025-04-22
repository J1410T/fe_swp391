import { RouteObject } from 'react-router-dom';

export const NOT_FOUND_ROUTE = '*' as const;

export const notFoundRoute: RouteObject = {
  path: NOT_FOUND_ROUTE,
  element:  <></>,
}; 