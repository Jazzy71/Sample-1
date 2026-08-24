import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAnalytics } from "@/hooks/use-analytics"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import type { NormalizedProcurementRow } from "@/lib/excel/schema"
import { getDerivedTotalAmount } from "@/lib/analytics/kpis"

const columns: DataTableColumn<NormalizedProcurementRow>[] = [
  { key: "vendor_name", header: "Vendor", render: (row) => row.vendor_name || "Unknown" },
  { key: "material_description", header: "Material", render: (row) => row.material_description || "Unknown" },
  { key: "po_date", header: "Date", render: (row) => row.po_date || "Unknown" },
  { key: "amount", header: "Amount", render: (row) => formatCurrency(getDerivedTotalAmount(row)) },
]

export function QuotationsPage() {
  const { kpis, rawData } = useAnalytics()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotations"
        description="Vendor quotations captured in your procurement workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard 
          label="Total Quotations (Lines)" 
          value={kpis ? formatNumber(rawData.length) : undefined} 
        />
        <KpiCard 
          label="Pending Review" 
          value="0" 
        />
        <KpiCard 
          label="Total Spend" 
          value={kpis ? formatCurrency(kpis.totalSpend) : undefined} 
        />
        <KpiCard 
          label="Average Turnaround" 
          value="-" 
        />
      </div>

      <DataTable
        columns={columns}
        data={rawData}
        rowKey={(row) => row.id}
        emptyTitle="No quotations yet"
        emptyDescription="Quotations will be listed here once a workbook has been processed."
      />
    </div>
  )
}
