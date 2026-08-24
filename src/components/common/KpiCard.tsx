import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatedNumber } from "@/components/common/AnimatedNumber"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  icon?: LucideIcon
  /**
   * Numeric value for animation, or string for static text.
   */
  value?: string | number
  formatter?: (val: number) => string
  helperText?: string
  className?: string
}

export function KpiCard({
  label,
  icon: Icon,
  value,
  formatter,
  helperText,
  className,
}: KpiCardProps) {
  const hasValue = value !== undefined

  const renderValue = () => {
    if (!hasValue) return "—"
    if (typeof value === "number") {
      return <AnimatedNumber value={value} formatFn={formatter} />
    }
    return value
  }

  return (
    <Card className={cn("gap-3", className)}>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        {Icon ? (
          <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
        ) : null}
      </CardHeader>
      <CardContent className="space-y-1">
        <p
          className={cn(
            "font-heading text-2xl font-semibold tracking-tight",
            !hasValue && "text-muted-foreground/40"
          )}
        >
          {renderValue()}
        </p>
        <p className="text-xs text-muted-foreground">
          {hasValue ? helperText : "Awaiting workbook data"}
        </p>
      </CardContent>
    </Card>
  )
}
