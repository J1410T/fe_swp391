import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ErrorBoundaryPage } from "@/pages/ErrorBoundaryPage";
import { notFoundRoute } from "@/routes/not-found";
import { dashboardRoute } from "@/routes/dashboard";
import { majorsRoute } from "@/routes/majors";
import { admissionMethodsRoute } from "@/routes/admission-methods";
import { campusesRoute } from "@/routes/campuses";
import { scholarshipsRoute } from "@/routes/scholarships";
import { dormitoriesRoute } from "@/routes/dormitories";
import { usersRoute } from "@/routes/users";
import authRoutes from "@/routes/auth";
import { AuthGuard } from "@/components/auth/auth-guard";
import Unauthorized from "@/pages/Unauthorized";

import { Navigate } from "react-router-dom";

/**
 * Main application routes configuration
 */
export const routes: RouteObject[] = [
  // Chuyển hướng từ trang chủ đến trang đăng nhập
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  // Các trang chính của ứng dụng (yêu cầu đăng nhập)
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: "dashboard",
        element: dashboardRoute.element,
      },
      majorsRoute,
      admissionMethodsRoute,
      campusesRoute,
      scholarshipsRoute,
      dormitoriesRoute,
      usersRoute,
      notFoundRoute,
    ],
  },
  // Trang không có quyền truy cập
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  // Các trang xác thực (không yêu cầu đăng nhập)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [...authRoutes],
  },
];
