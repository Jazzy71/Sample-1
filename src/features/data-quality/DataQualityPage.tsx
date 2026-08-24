import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAnalytics } from "@/hooks/use-analytics"
import { formatNumber } from "@/lib/formatters"

interface IssueRow {
  id: string
  rowNumber: number
  issue: string
  severity: "High" | "Medium" | "Low"
}

const columns: DataTableColumn<IssueRow>[] = [
  { key: "rowNumber", header: "Row", render: (row) => `Row ${row.rowNumber}` },
  { key: "issue", header: "Issue", render: (row) => row.issue },
  { key: "severity", header: "Severity", render: (row) => (
    <span className={
      row.severity === "High" ? "text-destructive font-medium" : 
      row.severity === "Medium" ? "text-amber-500 font-medium" : 
      "text-muted-foreground"
    }>
      {row.severity}
    </span>
  )},
]

export function DataQualityPage() {
  const { rawData } = useAnalytics()

  const issues: IssueRow[] = []
  
  rawData.forEach((row, i) => {
    if (!row.po_date) {
      issues.push({ id: `date-${i}`, rowNumber: i + 1, issue: "Missing PO Date", severity: "Medium" })
    }
    if (!row.vendor_name) {
      issues.push({ id: `vendor-${i}`, rowNumber: i + 1, issue: "Missing Vendor Name", severity: "High" })
    }
    if (!row.material_description) {
      issues.push({ id: `material-${i}`, rowNumber: i + 1, issue: "Missing Material Description", severity: "High" })
    }
    if (!row.quantity && !row.total_amount) {
      issues.push({ id: `amount-${i}`, rowNumber: i + 1, issue: "Missing Pricing Data", severity: "High" })
    }
  })

  const completeness = rawData.length > 0 
    ? Math.round(((rawData.length - (issues.length / 4)) / rawData.length) * 100) // Rough approximation
    : 100

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Quality"
        description="Completeness and validation results for your uploaded workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard 
          label="Estimated Completeness" 
          value={`${Math.max(0, Math.min(100, completeness))}%`} 
        />
        <KpiCard 
          label="Rows Scanned" 
          value={formatNumber(rawData.length)} 
        />
        <KpiCard 
          label="Fields Flagged" 
          value={formatNumber(issues.length)} 
        />
        <KpiCard 
          label="High Severity Issues" 
          value={formatNumber(issues.filter(i => i.severity === "High").length)} 
        />
      </div>

      <DataTable
        columns={columns}
        data={issues}
        rowKey={(row) => row.id}
        emptyTitle="No data quality issues found"
        emptyDescription={rawData.length > 0 ? "Your data looks perfectly clean!" : "Validation results will appear here once a workbook has been processed."}
      />
    </div>
  )
}
