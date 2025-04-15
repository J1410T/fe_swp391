import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ErrorBoundaryPage } from '@/pages/ErrorBoundaryPage';
import { homeRoute } from '@/routes/home';
import { notFoundRoute } from '@/routes/not-found';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      homeRoute,
      notFoundRoute,
    ],
  },
]; 