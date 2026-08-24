import { PageHeader } from "@/components/common/PageHeader"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAppState } from "@/state/app-state-context"

interface DynamicRow {
  id: string
  rowNumber: number
  data: any[]
}

export function RawDataPage() {
  const { parseResult } = useAppState()

  // Start with a row number column
  const columns: DataTableColumn<DynamicRow>[] = [
    { key: "rowNumber", header: "Row", render: (row) => `Row ${row.rowNumber}` }
  ]

  // Add dynamic columns based on the detected headers
  if (parseResult?.headers) {
    parseResult.headers.forEach((header, index) => {
      columns.push({
        key: `col_${index}`,
        header: header || `Col ${index + 1}`,
        render: (row) => {
          const val = row.data[index]
          return val !== undefined && val !== null ? String(val) : ""
        }
      })
    })
  }

  // Map the raw any[][] arrays to an object with an ID for the DataTable
  const rawDataList: DynamicRow[] = parseResult?.rawData.map((r: any[], i: number) => ({
    id: `raw-${i}`,
    rowNumber: i + 1,
    data: r
  })) || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Raw Data"
        description={`The unprocessed rows from ${parseResult?.sheetName || "your uploaded workbook"}.`}
      />

      <div className="overflow-x-auto pb-4">
        <DataTable
          columns={columns}
          data={rawDataList.slice(0, 500)} // Limit to 500 to avoid locking the UI
          rowKey={(row) => row.id}
          emptyTitle="No workbook data loaded yet"
          emptyDescription="Raw rows will appear here once a workbook has been uploaded and processed."
        />
      </div>
    </div>
  )
}
