import { AlertTriangle, Info, CheckCircle2 } from "lucide-react"

import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/common/EmptyState"
import { useAnalytics } from "@/hooks/use-analytics"
import { cn } from "@/lib/utils"

export function InsightsPage() {
  const { hasData, insights } = useAnalytics()

  const getIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="size-5 text-destructive" />
      case "medium": return <Info className="size-5 text-amber-500" />
      default: return <CheckCircle2 className="size-5 text-emerald-500" />
    }
  }

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-destructive/50"
      case "medium": return "border-amber-500/50"
      default: return "border-emerald-500/50"
    }
  }

  if (!hasData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Insights"
          description="Notable patterns and opportunities surfaced from your procurement data."
        />
        <EmptyState
          title="No data available"
          description="Insights are generated once a workbook has been processed."
          className="border-none py-12"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Insights"
        description="Auto-generated intelligence and anomaly detection based on your procurement patterns."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {insights.map((insight, idx) => (
          <Card key={idx} className={cn("transition-colors", getBorderColor(insight.severity))}>
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="mt-1">
                {getIcon(insight.severity)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold leading-none">{insight.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground ml-9 leading-relaxed">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
