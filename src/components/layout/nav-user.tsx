import {
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { AvatarImage } from "@/components/ui/avatar"
import Flag_of_Vietnam from "../../assets/images/Flag_of_Vietnam.svg.png"
export function NavUser() {
  // Sử dụng thông tin người dùng từ AuthContext
  const { user, logout } = useAuth();
  
  // Nếu không có thông tin người dùng, hiển thị avatar mặc định
  const userInfo = {
    name: user?.username || 'Người dùng',
    email: user?.email || '',
    role: user?.role || 'user',
  };
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-400 to-amber-500">
                <AvatarImage src={Flag_of_Vietnam} alt="@shadcn" />
                <AvatarFallback className="rounded-lg text-white font-medium">
                  {userInfo.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userInfo.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userInfo.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-400 to-amber-500">
                <AvatarImage src={Flag_of_Vietnam} alt="@shadcn" />
                  {/* <AvatarFallback className="rounded-lg text-white font-medium">
                    {userInfo.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback> */}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userInfo.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userInfo.role === 'admin' ? 'Quản trị viên' : userInfo.role === 'staff' ? 'Nhân viên' : 'Người dùng'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle className="mr-2 h-4 w-4" />
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettings className="mr-2 h-4 w-4" />
                <span>Cài đặt tài khoản</span>
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuItem onClick={logout}>
              <IconLogout className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-red-500">Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
