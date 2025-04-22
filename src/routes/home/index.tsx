import { RouteObject } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { homeLoader } from './loader';

export const HOME_ROUTE = '/' as const;

export const homeRoute: RouteObject = {
  index: true,
  element: <Home />,
  loader: homeLoader,
}; 