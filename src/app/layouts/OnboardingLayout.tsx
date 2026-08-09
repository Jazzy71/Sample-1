import { Outlet } from "react-router-dom"
import { BarChart3 } from "lucide-react"

export function OnboardingLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <header className="flex items-center gap-2 px-6 py-5">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <BarChart3 className="size-4" aria-hidden="true" />
        </div>
        <span className="font-heading text-sm font-semibold tracking-tight">
          ProcureLens
        </span>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
