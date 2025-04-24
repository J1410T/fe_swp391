import { type Icon } from "@tabler/icons-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * NavMain component for displaying the main navigation items
 */
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}): React.ReactElement {
  const location = useLocation();
  
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  asChild
                  className={cn(
                    "transition-all duration-200",
                    isActive && "relative overflow-visible bg-gradient-to-l from-orange-400/0 to-amber-500/20"
                  )}
                >
                  <Link 
                    to={item.url}
                    className={cn(
                      "group relative",
                      isActive && "font-medium"
                    )}
                  >
                    {/* Hiệu ứng border bên trái khi active */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-orange-400 to-amber-500" />
                    )}
                    
                    {/* Icon với màu gradient khi active */}
                    {item.icon && (
                      <span className={cn(
                        "transition-colors",
                        isActive ? "text-orange-500" : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        <item.icon />
                      </span>
                    )}
                    
                    {/* Text với màu gradient khi active */}
                    <span className={cn(
                      "transition-colors",
                      isActive ? "text-orange-500" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {item.title}
                    </span>
                    
                    {/* Hiệu ứng background khi active */}
                    {isActive && (
                      <span className="absolute inset-0 -z-10 rounded-md bg-orange-50 dark:bg-orange-950/10" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
