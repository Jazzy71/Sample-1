import type { NormalizedProcurementRow } from "@/lib/excel/schema"
import { getDerivedTotalAmount } from "./kpis"

export interface VendorSpend {
  vendor: string
  spend: number
  orderCount: number
}

export function getSpendByVendor(data: NormalizedProcurementRow[], limit?: number): VendorSpend[] {
  const vendorMap = new Map<string, VendorSpend>()

  for (const row of data) {
    const vendorName = row.vendor_name?.trim() || "Unknown Vendor"
    const amount = getDerivedTotalAmount(row)

    const existing = vendorMap.get(vendorName) || { vendor: vendorName, spend: 0, orderCount: 0 }
    existing.spend += amount
    existing.orderCount += 1
    vendorMap.set(vendorName, existing)
  }

  const sorted = Array.from(vendorMap.values()).sort((a, b) => b.spend - a.spend)
  return limit ? sorted.slice(0, limit) : sorted
}

export interface CategorySpend {
  category: string
  spend: number
}

export function getSpendByCategory(data: NormalizedProcurementRow[], limit?: number): CategorySpend[] {
  // Since we don't have an explicit 'category' in the base schema, 
  // we will proxy it using material_description prefixes or just unique materials
  const categoryMap = new Map<string, number>()

  for (const row of data) {
    const desc = row.material_description?.trim() || "Unknown Material"
    // simplistic grouping: first word of description
    const category = desc.split(" ")[0] || "Unknown"
    const amount = getDerivedTotalAmount(row)

    categoryMap.set(category, (categoryMap.get(category) || 0) + amount)
  }

  const sorted = Array.from(categoryMap.entries())
    .map(([category, spend]) => ({ category, spend }))
    .sort((a, b) => b.spend - a.spend)

  return limit ? sorted.slice(0, limit) : sorted
}

export interface SpendOverTime {
  period: string
  spend: number
  dateObj: Date
}

export function getSpendOverTime(data: NormalizedProcurementRow[]): SpendOverTime[] {
  const periodMap = new Map<string, { spend: number, dateObj: Date }>()

  for (const row of data) {
    const amount = getDerivedTotalAmount(row)
    let dateStr = row.po_date
    let dateObj: Date | null = null

    if (dateStr) {
      const parsed = new Date(dateStr)
      if (!isNaN(parsed.getTime())) {
        dateObj = parsed
      }
    }

    let periodKey = "Unknown Date"
    let sortDate = new Date(0) // epoch for unknowns

    if (dateObj) {
      // Group by YYYY-MM
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      periodKey = `${year}-${month}`
      sortDate = new Date(year, dateObj.getMonth(), 1)
    }

    const existing = periodMap.get(periodKey) || { spend: 0, dateObj: sortDate }
    existing.spend += amount
    periodMap.set(periodKey, existing)
  }

  const results = Array.from(periodMap.entries()).map(([period, info]) => ({
    period,
    spend: info.spend,
    dateObj: info.dateObj
  }))

  // Sort chronologically
  return results.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
}

