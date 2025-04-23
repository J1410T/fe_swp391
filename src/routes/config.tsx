import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ErrorBoundaryPage } from '@/pages/ErrorBoundaryPage';
import { notFoundRoute } from '@/routes/not-found';
import { dashboardRoute } from '@/routes/dashboard';
import { majorsRoute } from '@/routes/majors';
import { admissionMethodsRoute } from '@/routes/admission-methods';
import { campusesRoute } from '@/routes/campuses';
import { scholarshipsRoute } from '@/routes/scholarships';
import { dormitoriesRoute } from '@/routes/dormitories';
import { loginRoute } from '@/routes/auth/login';

import { Navigate } from 'react-router-dom';

/**
 * Main application routes configuration
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />,
      },
      dashboardRoute,
      majorsRoute,
      admissionMethodsRoute,
      campusesRoute,
      scholarshipsRoute,
      dormitoriesRoute,
      notFoundRoute,
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      loginRoute,
    ],
  },
]; 