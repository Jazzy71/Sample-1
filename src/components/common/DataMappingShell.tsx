import { ArrowRight } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PLACEHOLDER_FIELDS = [
  "Vendor name",
  "Material description",
  "Quantity",
  "Unit price",
  "PO date",
]

/**
 * Static preview of the column-mapping step the Phase 2 Excel
 * intelligence engine will drive. No detection or mapping logic lives
 * here yet — it is layout only, ready to be wired to real data later.
 */
export function DataMappingShell() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Column mapping</CardTitle>
        <CardDescription>
          Once your workbook is analyzed, detected columns will be matched to
          ProcureLens fields here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {PLACEHOLDER_FIELDS.map((field) => (
          <div
            key={field}
            className="flex items-center gap-3 rounded-lg border border-dashed px-3 py-2.5"
          >
            <span className="w-40 shrink-0 text-sm text-muted-foreground/50">
              Unmapped column
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground/40" aria-hidden="true" />
            <span className="text-sm font-medium">{field}</span>
            <Badge variant="outline" className="ml-auto text-muted-foreground">
              Pending
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
