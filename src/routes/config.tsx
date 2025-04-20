import { RouteObject, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui';
import LoadingRoute from '@/components/ui/LoadingRoute';
import ProtectedRoute from '@/components/ProtectedRoute';

// Lazy load Auth components
const Login = lazy(() => import('@/pages/Auth/Login'));

// Lazy load Admin components
const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const AdminMajors = lazy(() => import('@/pages/Admin/Majors'));
const AdminCampus = lazy(() => import('@/pages/Admin/Campus'));
const AdminAdmissionMethods = lazy(() => import('@/pages/Admin/AdmissionMethods'));
const AdminFeedbackTemplates = lazy(() => import('@/pages/Admin/FeedbackTemplates'));

// Lazy load Staff components
const StaffDashboard = lazy(() => import('@/pages/Staff/Dashboard'));
const StaffAdmissions = lazy(() => import('@/pages/Staff/Admissions'));
const StaffDormitory = lazy(() => import('@/pages/Staff/Dormitory'));
const StaffScholarships = lazy(() => import('@/pages/Staff/Scholarships'));

export const routes: RouteObject[] = [
  // Root path - kiểm tra phân quyền và chuyển hướng
  {
    path: '/',
    element: <ProtectedRoute>
      {/* Sẽ được chuyển hướng dựa trên role trong ProtectedRoute */}
      <div>Redirecting...</div>
    </ProtectedRoute>,
    index: true
  },
  
  // Auth routes (public)
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <LoadingRoute minLoadingTime={2500} alwaysShowOnReload={true}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <Login />
            </Suspense>
          </LoadingRoute>
        ),
      },
    ],
  },

  // Admin routes (protected)
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <AdminDashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'majors',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <AdminMajors />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'campus',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <AdminCampus />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admission-methods',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <AdminAdmissionMethods />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'feedback-templates',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <AdminFeedbackTemplates />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Staff routes (protected)
  {
    path: 'staff',
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <StaffDashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admissions',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <StaffAdmissions />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'dormitory',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <StaffDormitory />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'scholarships',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
              <StaffScholarships />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Chuyển hướng tất cả các đường dẫn không khớp về login
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />
  },
]; 