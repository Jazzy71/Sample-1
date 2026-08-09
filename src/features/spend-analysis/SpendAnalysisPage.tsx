import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { ChartContainer } from "@/components/common/ChartContainer"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface SpendRow {
  id: string
  category: string
  vendor: string
  amount: string
}

const columns: DataTableColumn<SpendRow>[] = [
  { key: "category", header: "Category", render: (row) => row.category },
  { key: "vendor", header: "Vendor", render: (row) => row.vendor },
  { key: "amount", header: "Amount", render: (row) => row.amount },
]

export function SpendAnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Spend Analysis"
        description="Break down procurement spend by category, vendor and time period."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Spend" />
        <KpiCard label="Average Order Value" />
        <KpiCard label="Year-over-Year Change" />
        <KpiCard label="Top Category" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartContainer
          title="Spend Over Time"
          description="Monthly procurement spend trend"
        />
        <ChartContainer
          title="Spend by Vendor"
          description="Top vendors by total spend"
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-sm font-medium">Spend Breakdown</h2>
        <DataTable
          columns={columns}
          data={[] as SpendRow[]}
          rowKey={(row) => row.id}
          emptyDescription="Spend breakdown will populate once a workbook has been processed."
        />
      </div>
    </div>
  )
}
