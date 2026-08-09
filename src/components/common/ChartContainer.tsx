import type { ReactNode } from "react"
import { BarChart3 } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EmptyState } from "@/components/common/EmptyState"

interface ChartContainerProps {
  title: string
  description?: string
  actions?: ReactNode
  /**
   * Phase 1 always renders the empty placeholder — no chart series is
   * ever plotted until the Phase 3 analytics engine supplies real data.
   */
  isEmpty?: boolean
  emptyMessage?: string
  children?: ReactNode
  className?: string
}

export function ChartContainer({
  title,
  description,
  actions,
  isEmpty = true,
  emptyMessage = "Charts will appear here once a workbook has been analyzed.",
  children,
  className,
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {actions ? <CardAction>{actions}</CardAction> : null}
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <EmptyState
            icon={BarChart3}
            title="No data to visualize yet"
            description={emptyMessage}
            className="border-none py-10"
          />
        ) : (
          <div className="h-64 w-full">{children}</div>
        )}
      </CardContent>
    </Card>
  )
}
