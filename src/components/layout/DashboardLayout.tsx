import React, { ReactNode } from "react";
import AppSidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.role === "admin" ? "Trang quản trị" : "Trang nhân viên"}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Xin chào,{" "}
                  <span className="font-medium text-orange-600">
                    {(user?.username ?? "").charAt(0).toUpperCase() +
                      (user?.username ?? "").slice(1)}
                  </span>
                </span>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
