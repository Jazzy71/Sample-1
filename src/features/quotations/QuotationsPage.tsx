import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"

interface QuotationRow {
  id: string
  quotationNumber: string
  vendor: string
  material: string
  status: string
}

const columns: DataTableColumn<QuotationRow>[] = [
  { key: "quotationNumber", header: "Quotation #", render: (row) => row.quotationNumber },
  { key: "vendor", header: "Vendor", render: (row) => row.vendor },
  { key: "material", header: "Material", render: (row) => row.material },
  { key: "status", header: "Status", render: (row) => row.status },
]

export function QuotationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotations"
        description="Vendor quotations captured in your procurement workbook."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Quotations" />
        <KpiCard label="Pending Review" />
        <KpiCard label="Approved" />
        <KpiCard label="Average Turnaround" />
      </div>

      <DataTable
        columns={columns}
        data={[] as QuotationRow[]}
        rowKey={(row) => row.id}
        emptyTitle="No quotations yet"
        emptyDescription="Quotations will be listed here once a workbook has been processed."
      />
    </div>
  )
}
