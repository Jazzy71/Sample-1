import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface MaterialRow {
  id: string
  material: string
  category: string
  vendor: string
  unitPrice: string
}

const columns: DataTableColumn<MaterialRow>[] = [
  { key: "material", header: "Material", render: (row) => row.material },
  { key: "category", header: "Category", render: (row) => row.category },
  { key: "vendor", header: "Vendor", render: (row) => row.vendor },
  { key: "unitPrice", header: "Unit Price", render: (row) => row.unitPrice },
]

export function MaterialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials"
        description="Materials and items detected across your procurement workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Materials" />
        <KpiCard label="Categories" />
        <KpiCard label="Average Unit Price" />
        <KpiCard label="Price Volatility" />
      </div>

      <DataTable
        columns={columns}
        data={[] as MaterialRow[]}
        rowKey={(row) => row.id}
        emptyTitle="No materials yet"
        emptyDescription="Materials will be listed here once a workbook has been processed."
      />
    </div>
  )
}
