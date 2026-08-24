import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { AuroraBackground } from "@/components/common/AuroraBackground"

export function DashboardLayout() {
  const location = useLocation()

  return (
    <SidebarProvider>
      <AuroraBackground />
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="space-y-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
