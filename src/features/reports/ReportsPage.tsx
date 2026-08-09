import { ClipboardList } from "lucide-react"

import { PageHeader } from "@/components/common/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const REPORT_TYPES = [
  { title: "Spend Summary", description: "Overview of total spend by category and vendor." },
  { title: "Vendor Performance", description: "Comparative breakdown across vendors." },
  { title: "Data Quality Report", description: "Validation and completeness summary." },
]

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate shareable procurement reports from your analyzed data."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {REPORT_TYPES.map((report) => (
          <Card key={report.title}>
            <CardHeader className="flex-row items-center gap-2">
              <ClipboardList className="size-4 text-muted-foreground" aria-hidden="true" />
              <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{report.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" disabled className="w-full">
                Available in a later phase
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
