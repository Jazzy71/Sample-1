import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Topbar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-white/40 dark:border-white/10 px-4 bg-white/30 dark:bg-black/30 backdrop-blur-xl sticky top-0 z-50">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex flex-1 items-center justify-between">
        <p className="text-sm text-muted-foreground">Excel-driven procurement spend analytics</p>
      </div>
    </header>
  )
}
