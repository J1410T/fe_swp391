import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ErrorBoundaryPage } from '@/pages/ErrorBoundaryPage';
import { homeRoute } from './home';
import { notFoundRoute } from './not-found';

/**
 * Main application routes configuration
 * Add new routes in the children array
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      homeRoute,
      notFoundRoute,
      // Add more routes here as needed
    ],
  },
]; 