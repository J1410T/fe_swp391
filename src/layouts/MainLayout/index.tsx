import { Outlet } from 'react-router-dom';
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { LoadingProvider } from "@/contexts/LoadingContext";

/**
 * Main layout cho ứng dụng
 * Bao gồm sidebar, header và nội dung chính
 * Sử dụng LoadingProvider để quản lý loading khi chuyển trang
 */
export const MainLayout = () => {
  return (
    <LoadingProvider>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </LoadingProvider>
  );
}; 