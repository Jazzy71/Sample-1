import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface IssueRow {
  id: string
  sheet: string
  column: string
  issue: string
}

const columns: DataTableColumn<IssueRow>[] = [
  { key: "sheet", header: "Sheet", render: (row) => row.sheet },
  { key: "column", header: "Column", render: (row) => row.column },
  { key: "issue", header: "Issue", render: (row) => row.issue },
]

export function DataQualityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Quality"
        description="Completeness and validation results for your uploaded workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Completeness" />
        <KpiCard label="Missing Fields" />
        <KpiCard label="Duplicate Rows" />
        <KpiCard label="Validation Errors" />
      </div>

      <DataTable
        columns={columns}
        data={[] as IssueRow[]}
        rowKey={(row) => row.id}
        emptyTitle="No data quality issues yet"
        emptyDescription="Validation results will appear here once a workbook has been processed."
      />
    </div>
  )
}
