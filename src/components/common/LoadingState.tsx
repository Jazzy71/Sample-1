import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  rows?: number
  variant?: "list" | "card" | "table"
}

export function LoadingState({ rows = 3, variant = "list" }: LoadingStateProps) {
  if (variant === "card") {
    return (
      <div className="space-y-3 rounded-lg border p-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }

  if (variant === "table") {
    return (
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" style={{ maxWidth: `${90 - i * 10}%` }} />
      ))}
    </div>
  )
}
