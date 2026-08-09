import { RouterProvider } from "react-router-dom"

import { TooltipProvider } from "@/components/ui/tooltip"
import { AppStateProvider } from "@/state/app-state-context"
import { router } from "@/app/routes"

export function App() {
  return (
    <AppStateProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </AppStateProvider>
  )
}
