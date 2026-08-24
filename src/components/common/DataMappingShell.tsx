import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppState } from "@/state/app-state-context"
import { STANDARD_COLUMNS, type StandardColumnKey } from "@/lib/excel/schema"

export function DataMappingShell() {
  const { parseResult, setParseResult } = useAppState()

  if (!parseResult) return null

  const handleMappingChange = (columnIndex: number, newKey: StandardColumnKey | null) => {
    const newMappings = [...parseResult.mappings]
    const mappingIndex = newMappings.findIndex(m => m.columnIndex === columnIndex)
    
    if (mappingIndex >= 0) {
      newMappings[mappingIndex] = {
        ...newMappings[mappingIndex],
        mappedKey: newKey,
        confidence: "high" // manual override implies high confidence
      }
      setParseResult({ ...parseResult, mappings: newMappings })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Column mapping</CardTitle>
        <CardDescription>
          Review and adjust how columns from your workbook map to standard CostCompass fields.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {parseResult.mappings.map((mapping) => {
          return (
            <div
              key={mapping.columnIndex}
              className="flex items-center gap-4 rounded-lg border px-4 py-3"
            >
              <div className="flex w-1/3 items-center gap-2">
                <span className="truncate text-sm font-medium" title={mapping.originalHeader}>
                  {mapping.originalHeader || `Column ${mapping.columnIndex + 1}`}
                </span>
                {mapping.confidence === "high" && <CheckCircle className="size-4 text-primary" />}
                {mapping.confidence === "low" && <HelpCircle className="size-4 text-amber-500" />}
              </div>

              <ArrowRight className="size-4 shrink-0 text-muted-foreground/40" aria-hidden="true" />
              
              <div className="flex w-1/3">
                <select
                  value={mapping.mappedKey || ""}
                  onChange={(e) => handleMappingChange(mapping.columnIndex, e.target.value as StandardColumnKey || null)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">-- Ignore Column --</option>
                  {STANDARD_COLUMNS.map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>

              <Badge 
                variant={mapping.confidence === "high" ? "default" : mapping.confidence === "low" ? "secondary" : "outline"} 
                className="ml-auto"
              >
                {mapping.confidence === "high" ? "Auto-mapped" : mapping.confidence === "low" ? "Low confidence" : "Unmapped"}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
