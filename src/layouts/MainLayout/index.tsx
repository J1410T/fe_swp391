import { Outlet } from 'react-router-dom';
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
          <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}; 