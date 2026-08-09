import { PageHeader } from "@/components/common/PageHeader"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface RawRow {
  id: string
  sheet: string
  rowNumber: string
  preview: string
}

const columns: DataTableColumn<RawRow>[] = [
  { key: "sheet", header: "Sheet", render: (row) => row.sheet },
  { key: "rowNumber", header: "Row", render: (row) => row.rowNumber },
  { key: "preview", header: "Preview", render: (row) => row.preview },
]

export function RawDataPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Raw Data"
        description="The unprocessed rows from your uploaded workbook, sheet by sheet."
      />

      <DataTable
        columns={columns}
        data={[] as RawRow[]}
        rowKey={(row) => row.id}
        emptyTitle="No workbook data loaded yet"
        emptyDescription="Raw rows will appear here once a workbook has been uploaded and processed."
      />
    </div>
  )
}
