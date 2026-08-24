import { BarChart, Bar, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, LineChart, Line } from "recharts"
import { motion } from "framer-motion"

import { PageHeader } from "@/components/common/PageHeader"
import { KpiCard } from "@/components/common/KpiCard"
import { ChartContainer } from "@/components/common/ChartContainer"
import { DataTable, type DataTableColumn } from "@/components/common/DataTable"
import { useAnalytics } from "@/hooks/use-analytics"
import { formatCurrency, formatCurrencyCompact } from "@/lib/formatters"
import type { NormalizedProcurementRow } from "@/lib/excel/schema"
import { getDerivedTotalAmount } from "@/lib/analytics/kpis"

const columns: DataTableColumn<NormalizedProcurementRow>[] = [
  { key: "category", header: "Category / Material", render: (row) => row.material_description || "Unknown" },
  { key: "vendor", header: "Vendor", render: (row) => row.vendor_name || "Unknown" },
  { key: "date", header: "Date", render: (row) => row.po_date || "Unknown" },
  { key: "amount", header: "Amount", render: (row) => formatCurrency(getDerivedTotalAmount(row)) },
]

export function SpendAnalysisPage() {
  const { hasData, kpis, spendOverTime, spendByCategory, spendByVendor, rawData } = useAnalytics()

  const topCategory = spendByCategory.length > 0 ? spendByCategory[0].category : undefined

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spend Analysis"
        description="Break down procurement spend by category, vendor and time period."
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
            value={kpis?.totalSpend}
            formatter={formatCurrency} 
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Average Order Value" 
            value={kpis?.averageOrderValue}
            formatter={formatCurrency} 
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Top Category" 
            value={topCategory} 
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Top Vendor" 
            value={spendByVendor.length > 0 ? spendByVendor[0].vendor : undefined} 
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartContainer
          title="Spend Over Time"
          description="Monthly procurement spend trend"
          isEmpty={!hasData || spendOverTime.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendOverTime}>
              <defs>
                <linearGradient id="colorSpendTrendPage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={1}/>
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
              <Line type="monotone" dataKey="spend" stroke="url(#colorSpendTrendPage)" strokeWidth={3} dot={{ stroke: '#ec4899', strokeWidth: 2, fill: 'white' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Spend by Vendor"
          description="Top vendors by total spend"
          isEmpty={!hasData || spendByVendor.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendByVendor.slice(0, 5)} layout="vertical">
              <defs>
                <linearGradient id="colorVendorPage" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="vendor" 
                type="category" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                width={100}
              />
              <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="spend" fill="url(#colorVendorPage)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-sm font-medium">Spend Breakdown</h2>
        <DataTable
          columns={columns}
          data={rawData}
          rowKey={(row) => row.id}
          emptyDescription="Spend breakdown will populate once a workbook has been processed."
        />
      </div>
    </div>
  )
}
