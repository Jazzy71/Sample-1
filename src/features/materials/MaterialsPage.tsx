import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAnalytics } from "@/hooks/use-analytics"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import type { NormalizedProcurementRow } from "@/lib/excel/schema"

const columns: DataTableColumn<NormalizedProcurementRow>[] = [
  { key: "material_description", header: "Material", render: (row) => row.material_description || "Unknown" },
  { key: "vendor_name", header: "Vendor", render: (row) => row.vendor_name || "Unknown" },
  { key: "quantity", header: "Quantity", render: (row) => row.quantity ? formatNumber(row.quantity) : "0" },
  { key: "unitPrice", header: "Unit Price", render: (row) => formatCurrency(row.unit_price || 0) },
]

export function MaterialsPage() {
  const { kpis, rawData, spendByCategory } = useAnalytics()

  const avgUnitPrice = rawData.length > 0 
    ? rawData.reduce((sum, r) => sum + (r.unit_price || 0), 0) / rawData.length 
    : 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials"
        description="Materials and items detected across your procurement workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard 
          label="Total Materials" 
          value={kpis ? formatNumber(kpis.uniqueMaterials) : undefined} 
        />
        <KpiCard 
          label="Categories Detected" 
          value={spendByCategory ? formatNumber(spendByCategory.length) : undefined} 
        />
        <KpiCard 
          label="Average Unit Price" 
          value={kpis ? formatCurrency(avgUnitPrice) : undefined} 
        />
        <KpiCard 
          label="Top Category" 
          value={spendByCategory && spendByCategory.length > 0 ? spendByCategory[0].category : undefined} 
        />
      </div>

      <DataTable
        columns={columns}
        data={rawData}
        rowKey={(row) => row.id}
        emptyTitle="No materials yet"
        emptyDescription="Materials will be listed here once a workbook has been processed."
      />
    </div>
  )
}
