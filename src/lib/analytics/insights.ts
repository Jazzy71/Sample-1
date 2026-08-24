import type { NormalizedProcurementRow } from "@/lib/excel/schema"
import { getSpendByVendor } from "./aggregations"
import { calculateTotalSpend } from "./kpis"
import { formatCurrencyCompact } from "@/lib/formatters"

export interface Insight {
  title: string
  description: string
  severity: "high" | "medium" | "low"
}

export function generateInsights(data: NormalizedProcurementRow[]): Insight[] {
  if (!data || data.length === 0) return []

  const insights: Insight[] = []
  const totalSpend = calculateTotalSpend(data)
  const vendors = getSpendByVendor(data)

  // 1. Vendor Concentration Risk
  if (vendors.length > 0 && totalSpend > 0) {
    const topVendor = vendors[0]
    const concentration = topVendor.spend / totalSpend
    
    if (concentration > 0.6) {
      insights.push({
        title: "High Vendor Concentration",
        description: `${topVendor.vendor} accounts for ${Math.round(concentration * 100)}% of your total spend (${formatCurrencyCompact(topVendor.spend)}). Consider diversifying suppliers to reduce supply chain risk.`,
        severity: "high",
      })
    } else if (concentration > 0.4) {
      insights.push({
        title: "Moderate Vendor Dependency",
        description: `${topVendor.vendor} accounts for ${Math.round(concentration * 100)}% of total spend. Keep an eye on pricing leverage.`,
        severity: "medium",
      })
    }
  }

  // 2. Data Quality / Missing Data
  const missingDates = data.filter(r => !r.po_date).length
  if (missingDates > 0) {
    const pct = Math.round((missingDates / data.length) * 100)
    if (pct > 20) {
      insights.push({
        title: "Poor Data Quality: Dates",
        description: `${pct}% of your records are missing purchase dates. This heavily impacts spend-over-time trend analysis.`,
        severity: "medium"
      })
    }
  }

  // 3. Small Orders Analysis (Efficiency)
  const smallOrders = data.filter(r => {
    const amount = typeof r.total_amount === "number" ? r.total_amount : ((r.quantity || 0) * (r.unit_price || 0))
    return amount > 0 && amount < 1000 // arbitrary threshold for "small" in INR
  }).length

  if (smallOrders > 0) {
    const pct = Math.round((smallOrders / data.length) * 100)
    if (pct > 50) {
      insights.push({
        title: "High Volume of Micro-Transactions",
        description: `${pct}% of your line items are under ₹1,000. This may indicate inefficient purchasing processes. Consolidating orders could save administrative costs.`,
        severity: "low"
      })
    }
  }

  // Fallback if no specific insights hit
  if (insights.length === 0) {
    insights.push({
      title: "Healthy Procurement Data",
      description: "Spend is well distributed, data quality is good, and no immediate anomalies were detected in this dataset.",
      severity: "low"
    })
  }

  return insights
}

