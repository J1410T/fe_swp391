import * as React from "react";
import { Link } from "react-router-dom";
import {
  // IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconCertificate,
  IconDashboard,
  // IconUser,
  // IconHistory,
  // IconHelp,
} from "@tabler/icons-react";
import { Bolt } from 'lucide-react';
import { NavMain } from "@/components/layout/nav-main";
// import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

/**
 * Data for the sidebar navigation
 */
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Kế hoạch tuyển sinh",
      url: "/admission-methods",
      icon: IconCertificate,
    },
    {
      title: "Cơ sở đào tạo",
      url: "/campuses",
      icon: IconBuildingSkyscraper,
    },
    // {
    //   title: "Học bổng",
    //   url: "/scholarships",
    //   icon: IconCertificate,
    // },
    {
      title: "Cấu hình ngành học",
      url: "/majors",
      icon: Bolt,
    },
    // {
    //   title: "Ký túc xá",
    //   url: "/dormitories",
    //   icon: IconBuildingCommunity,
    // },
    // {
    //   title: "Quản lý người dùng",
    //   url: "/users",
    //   icon: IconUser,
    // },
    // {
    //   title: "Phiên chatbot",
    //   url: "/chatbot-sessions",
    //   icon: IconHistory,
    // },
  ],
  // navSecondary: [
  //   {
  //     title: "Cài đặt",
  //     url: "/settings",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Trợ giúp",
  //     url: "/help",
  //     icon: IconHelp,
  //   },
  // ],
};

/**
 * AppSidebar component for the FPTU Admissions Admin Dashboard
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="py-6 border-b border-border/40">
        <div className="flex justify-center">
          <Link to="/" className="block">
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/src/assets/images/logo.svg"
                alt="FPT University"
                className="h-12 w-auto"
              />
              <div className="text-sm font-medium text-primary">Admissions</div>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <NavUser />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
