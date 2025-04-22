import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ErrorBoundaryPage } from '@/pages/ErrorBoundaryPage';
import { homeRoute } from '@/routes/home';
import { notFoundRoute } from '@/routes/not-found';
import { dashboardRoute } from '@/routes/dashboard';
import { majorsRoute } from '@/routes/majors';
import { admissionMethodsRoute } from '@/routes/admission-methods';
import { campusesRoute } from '@/routes/campuses';
import { scholarshipsRoute } from '@/routes/scholarships';
import { dormitoriesRoute } from '@/routes/dormitories';
import { usersRoute } from '@/routes/users';
import { chatbotSessionsRoute } from '@/routes/chatbot-sessions';

/**
 * Main application routes configuration
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      homeRoute,
      dashboardRoute,
      majorsRoute,
      admissionMethodsRoute,
      campusesRoute,
      scholarshipsRoute,
      dormitoriesRoute,
      usersRoute,
      chatbotSessionsRoute,
      notFoundRoute,
    ],
  },
]; 