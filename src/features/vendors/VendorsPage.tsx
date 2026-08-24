import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAnalytics } from "@/hooks/use-analytics"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import type { VendorSpend } from "@/lib/analytics/aggregations"

const columns: DataTableColumn<VendorSpend>[] = [
  { key: "vendor", header: "Vendor", render: (row) => row.vendor },
  { key: "orders", header: "Total Orders", render: (row) => formatNumber(row.orderCount) },
  { key: "totalSpend", header: "Total Spend", render: (row) => formatCurrency(row.spend) },
  { key: "avgSpend", header: "Avg Order Value", render: (row) => formatCurrency(row.orderCount > 0 ? row.spend / row.orderCount : 0) },
]

export function VendorsPage() {
  const { kpis, spendByVendor } = useAnalytics()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors"
        description="All vendors detected in your procurement workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard 
          label="Total Vendors" 
          value={kpis ? formatNumber(kpis.uniqueVendors) : undefined} 
        />
        <KpiCard 
          label="Top Vendor by Spend" 
          value={spendByVendor.length > 0 ? spendByVendor[0].vendor : undefined} 
        />
        <KpiCard 
          label="Top Vendor Spend" 
          value={spendByVendor.length > 0 ? formatCurrency(spendByVendor[0].spend) : undefined} 
        />
      </div>

      <DataTable
        columns={columns}
        data={spendByVendor}
        rowKey={(row) => row.vendor}
        emptyTitle="No vendors yet"
        emptyDescription="Vendors will be listed here once a workbook has been processed."
      />
    </div>
  )
}
