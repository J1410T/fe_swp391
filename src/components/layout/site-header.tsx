import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav"

/**
 * Header chính của ứng dụng, hiển thị breadcrumb và các action
 */
export function SiteHeader() {

  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-t-2xl py-1">
      <div className="flex w-full items-center px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-2 mr-1" />

          <Separator
            orientation="vertical"
            className="mx-2 hidden data-[orientation=vertical]:h-4 sm:block"
          />
          <div className="hidden sm:block">
            <BreadcrumbNav />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Thông báo</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
