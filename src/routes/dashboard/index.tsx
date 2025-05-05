import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { loadDashboardData } from "./loader";
import { AuthGuard } from "@/components/auth/auth-guard";

export const DASHBOARD_ROUTE = "/dashboard" as const;

/**
 * Cấu hình route cho trang Dashboard
 * Chỉ admin mới có quyền truy cập
 */
export const dashboardRoute: RouteObject = {
  path: "dashboard",
  element: (
    <AuthGuard requireAdmin>
      <Dashboard />
    </AuthGuard>
  ),
  loader: loadDashboardData,
  handle: {
    breadcrumb: "Tổng quan",
  },
};
