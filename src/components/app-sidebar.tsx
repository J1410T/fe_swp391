import * as React from "react"
import { Link } from "react-router-dom"
import {
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconCertificate,
  IconDashboard,
  IconSchool,
  IconSettings,
  IconUser,
  IconHistory,
  IconHelp,
} from "@tabler/icons-react"


import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * Data for the sidebar navigation
 */
const data = {
  user: {
    name: "Admin",
    email: "admin@fpt.edu.vn",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Ngành học",
      url: "/majors",
      icon: IconSchool,
    },
    {
      title: "Phương thức tuyển sinh",
      url: "/admission-methods",
      icon: IconCertificate,
    },
    {
      title: "Cơ sở đào tạo",
      url: "/campuses",
      icon: IconBuildingSkyscraper,
    },
    {
      title: "Học bổng",
      url: "/scholarships",
      icon: IconCertificate,
    },
    {
      title: "Ký túc xá",
      url: "/dormitories",
      icon: IconBuildingCommunity,
    },
    {
      title: "Quản lý người dùng",
      url: "/users",
      icon: IconUser,
    },
    {
      title: "Phiên chatbot",
      url: "/chatbot-sessions",
      icon: IconHistory,
    },
  ],
  navSecondary: [
    {
      title: "Cài đặt",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Trợ giúp",
      url: "/help",
      icon: IconHelp,
    },
  ],
}

/**
 * AppSidebar component for the FPTU Admissions Admin Dashboard
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/" className="flex items-center gap-2">
                <img src="/src/assets/images/logo.svg" alt="FPT University" className="h-8 w-auto" />
                <span className="text-base font-semibold">FPTU Admissions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4">
          <NavUser user={data.user} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
