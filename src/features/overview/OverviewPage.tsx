import { BarChart3, Building2, Package, ReceiptText } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, LineChart, Line } from "recharts"
import { motion } from "framer-motion"

import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { ChartContainer } from "@/components/common/ChartContainer"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAnalytics } from "@/hooks/use-analytics"
import { formatCurrency, formatNumber, formatCurrencyCompact } from "@/lib/formatters"
import type { NormalizedProcurementRow } from "@/lib/excel/schema"


const recentColumns: DataTableColumn<NormalizedProcurementRow>[] = [
  { key: "vendor_name", header: "Vendor", render: (row) => row.vendor_name || "Unknown" },
  { key: "material_description", header: "Material", render: (row) => row.material_description || "Unknown" },
  { key: "po_date", header: "Date", render: (row) => row.po_date || "Unknown" },
  { key: "total_amount", header: "Amount", render: (row) => formatCurrency(row.total_amount || 0) },
]

export function OverviewPage() {
  const { hasData, kpis, spendOverTime, spendByCategory, rawData } = useAnalytics()

  const recentData = rawData.slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="A snapshot of your procurement spend."
      />

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Total Spend" 
            icon={ReceiptText} 
            value={kpis?.totalSpend} 
            formatter={formatCurrency}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Active Vendors" 
            icon={Building2} 
            value={kpis?.uniqueVendors} 
            formatter={formatNumber}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Materials Tracked" 
            icon={Package} 
            value={kpis?.uniqueMaterials}
            formatter={formatNumber} 
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Avg Order Value" 
            icon={BarChart3} 
            value={kpis?.averageOrderValue} 
            formatter={formatCurrency}
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartContainer
          title="Spend Trend"
          description="Spend over time across all vendors"
          isEmpty={!hasData || spendOverTime.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendOverTime}>
              <defs>
                <linearGradient id="colorSpendTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="period" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => formatCurrencyCompact(value)} 
              />
              <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} />
              <Line type="monotone" dataKey="spend" stroke="url(#colorSpendTrend)" strokeWidth={3} dot={{ stroke: '#8b5cf6', strokeWidth: 2, fill: 'white' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Spend by Category"
          description="Distribution of spend across material categories"
          isEmpty={!hasData || spendByCategory.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendByCategory.slice(0, 5)}>
              <defs>
                <linearGradient id="colorSpendCategory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="category" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => formatCurrencyCompact(value)} 
              />
              <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="spend" fill="url(#colorSpendCategory)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-sm font-medium">Recent Entries</h2>
        <DataTable
          columns={recentColumns}
          data={recentData}
          rowKey={(row) => row.id}
          emptyTitle="No activity yet"
          emptyDescription="Activity will appear here once a workbook has been processed."
        />
      </div>
    </div>
  )
}
