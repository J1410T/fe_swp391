import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Building,
  FileCheck,
  MessageSquare,
  GraduationCap,
  Home,
  Award,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logoAdmission from "@/assets/images/logo-admission.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: BookOpen, label: "Ngành học", path: "/admin/majors" },
    { icon: Building, label: "Campus", path: "/admin/campus" },
    {
      icon: FileCheck,
      label: "Hình thức xét tuyển",
      path: "/admin/admission-methods",
    },
    {
      icon: MessageSquare,
      label: "Mẫu phản hồi",
      path: "/admin/feedback-templates",
    },
  ];

  const staffMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/staff/dashboard" },
    {
      icon: GraduationCap,
      label: "Tuyển sinh ngành",
      path: "/staff/admissions",
    },
    { icon: Home, label: "Ký túc xá", path: "/staff/dormitory" },
    { icon: Award, label: "Học bổng", path: "/staff/scholarships" },
  ];

  const menuItems = user?.role === "admin" ? adminMenuItems : staffMenuItems;

  return (
    <div
      className={cn(
        "h-screen bg-white text-gray-800 shadow-sm transition-all duration-300 border-r border-gray-200 flex flex-col",
        collapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      {/* Logo + Collapse Button */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <img
            src={logoAdmission}
            alt="Logo"
            className={cn(
              "transition-all duration-300 object-contain",
              collapsed ? "h-16 w-16 scale-200" : "h-12 w-auto"
            )}
          />

          {!collapsed && (
            <span className="ml-2 text-lg font-bold text-orange-600">
              Admission
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 "
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <Separator />

      {/* Menu Items */}
      <div className="px-2 py-4 space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "w-full justify-start flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                  : "text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </div>

      {/* Logout section */}
      <div className="border-t border-gray-100 p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center text-sm text-gray-700 hover:text-red-600 hover:bg-red-50",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-2">Đăng xuất</span>}
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;
