import { BarChart3, Building2, Package, ReceiptText } from "lucide-react"

import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { ChartContainer } from "@/components/common/ChartContainer"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface ActivityRow {
  id: string
  event: string
  timestamp: string
}

const columns: DataTableColumn<ActivityRow>[] = [
  { key: "event", header: "Event", render: (row) => row.event },
  { key: "timestamp", header: "Time", render: (row) => row.timestamp },
]

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="A snapshot of your procurement spend once a workbook has been analyzed."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Spend" icon={ReceiptText} />
        <KpiCard label="Active Vendors" icon={Building2} />
        <KpiCard label="Materials Tracked" icon={Package} />
        <KpiCard label="Open Quotations" icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartContainer
          title="Spend Trend"
          description="Spend over time across all vendors"
        />
        <ChartContainer
          title="Spend by Category"
          description="Distribution of spend across material categories"
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-sm font-medium">Recent Activity</h2>
        <DataTable
          columns={columns}
          data={[] as ActivityRow[]}
          rowKey={(row) => row.id}
          emptyTitle="No activity yet"
          emptyDescription="Activity will appear here once a workbook has been processed."
        />
      </div>
    </div>
  )
}
