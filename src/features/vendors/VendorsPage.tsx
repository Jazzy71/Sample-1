import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface VendorRow {
  id: string
  name: string
  category: string
  totalSpend: string
  orders: string
}

const columns: DataTableColumn<VendorRow>[] = [
  { key: "name", header: "Vendor", render: (row) => row.name },
  { key: "category", header: "Category", render: (row) => row.category },
  { key: "totalSpend", header: "Total Spend", render: (row) => row.totalSpend },
  { key: "orders", header: "Orders", render: (row) => row.orders },
]

export function VendorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors"
        description="All vendors detected in your procurement workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Vendors" />
        <KpiCard label="Active Vendors" />
        <KpiCard label="Top Vendor by Spend" />
        <KpiCard label="Average Lead Time" />
      </div>

      <DataTable
        columns={columns}
        data={[] as VendorRow[]}
        rowKey={(row) => row.id}
        emptyTitle="No vendors yet"
        emptyDescription="Vendors will be listed here once a workbook has been processed."
      />
    </div>
  )
}
