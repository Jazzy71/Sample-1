import { NavLink, useLocation } from "react-router-dom"
import {
  BarChart3,
  Building2,
  ClipboardList,
  Database,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Package,
  ShieldCheck,
} from "lucide-react"

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { to: "/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/spend-analysis", label: "Spend Analysis", icon: BarChart3 },
  { to: "/vendors", label: "Vendors", icon: Building2 },
  { to: "/materials", label: "Materials", icon: Package },
  { to: "/quotations", label: "Quotations", icon: FileText },
  { to: "/insights", label: "Insights", icon: Lightbulb },
  { to: "/data-quality", label: "Data Quality", icon: ShieldCheck },
  { to: "/raw-data", label: "Raw Data", icon: Database },
  { to: "/reports", label: "Reports", icon: ClipboardList },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="size-4" aria-hidden="true" />
          </div>
          <span className="font-heading text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            ProcureLens
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={location.pathname.startsWith(item.to)}
                  >
                    <NavLink to={item.to}>
                      <item.icon />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="px-2 py-1.5 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Phase 1 · Frontend Foundation
        </p>
      </SidebarFooter>
    </SidebarRoot>
  )
}
