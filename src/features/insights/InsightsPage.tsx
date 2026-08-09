import { Lightbulb } from "lucide-react"

import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/common/EmptyState"

const INSIGHT_PLACEHOLDERS = [
  "Cost-saving opportunities",
  "Vendor concentration risk",
  "Price trend anomalies",
]

export function InsightsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Insights"
        description="Notable patterns and opportunities surfaced from your procurement data."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {INSIGHT_PLACEHOLDERS.map((title) => (
          <Card key={title}>
            <CardHeader className="flex-row items-center gap-2">
              <Lightbulb className="size-4 text-muted-foreground" aria-hidden="true" />
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Not available yet"
                description="Insights are generated once the analytics engine is introduced in a later phase."
                className="border-none py-6"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
