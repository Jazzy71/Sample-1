import { useNavigate } from "react-router-dom"
import { ArrowRight, FileSpreadsheet } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataMappingShell } from "@/components/common/DataMappingShell"
import { useAppState } from "@/state/app-state-context"
import { procurementRowSchema, type NormalizedProcurementRow } from "@/lib/excel/schema"
import type { StandardColumnKey } from "@/lib/excel/schema"

export function WorkbookUnderstandingPage() {
  const navigate = useNavigate()
  const { uploadedFile, parseResult, setNormalizedData, setWorkflowStage } = useAppState()

  const handleContinue = () => {
    if (!parseResult) return

    // Transform rawData to NormalizedProcurementRow based on mappings
    const normalizedData: NormalizedProcurementRow[] = parseResult.rawData.map((row) => {
      const normalizedRow: Partial<Record<StandardColumnKey, any>> = {}

      parseResult.mappings.forEach((mapping) => {
        if (mapping.mappedKey) {
          const val = row[mapping.columnIndex]
          // Basic type coercion for numeric fields could be added here
          normalizedRow[mapping.mappedKey] = val
        }
      })

      // We use zod to parse and apply defaults/nulls safely
      const parsed = procurementRowSchema.safeParse(normalizedRow)
      if (parsed.success) {
        return parsed.data
      } else {
        // Fallback for badly shaped row, just return it mostly empty 
        // with whatever we could salvage
        return procurementRowSchema.parse({})
      }
    })

    setNormalizedData(normalizedData)
    setWorkflowStage("ready")
    navigate("/overview")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FileSpreadsheet className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <CardTitle>{uploadedFile?.name ?? "Workbook"}</CardTitle>
              <CardDescription>
                {parseResult
                  ? `Selected sheet: "${parseResult.sheetName}" with ${parseResult.rowCount} rows.`
                  : "Sheet structure and detected columns will be summarized here."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        {parseResult && (
          <CardContent>
            <div className="text-sm text-muted-foreground">
              We analyzed the first {Math.min(parseResult.rowCount, 20)} rows and detected {parseResult.headers.length} columns.
            </div>
          </CardContent>
        )}
      </Card>
      
      <DataMappingShell />

      <div className="flex justify-end">
        <Button onClick={handleContinue} disabled={!parseResult}>
          Continue to Dashboard <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
