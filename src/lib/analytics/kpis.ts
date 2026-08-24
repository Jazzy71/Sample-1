import type { NormalizedProcurementRow } from "@/lib/excel/schema"

export function getDerivedTotalAmount(row: NormalizedProcurementRow): number {
  if (typeof row.total_amount === "number") return row.total_amount
  if (typeof row.quantity === "number" && typeof row.unit_price === "number") {
    return row.quantity * row.unit_price
  }
  return 0
}

export function calculateTotalSpend(data: NormalizedProcurementRow[]): number {
  return data.reduce((sum, row) => sum + getDerivedTotalAmount(row), 0)
}

export function countUniqueVendors(data: NormalizedProcurementRow[]): number {
  const vendors = new Set<string>()
  for (const row of data) {
    if (row.vendor_name) {
      vendors.add(row.vendor_name.trim().toLowerCase())
    }
  }
  return vendors.size
}

export function countUniqueMaterials(data: NormalizedProcurementRow[]): number {
  const materials = new Set<string>()
  for (const row of data) {
    if (row.material_description) {
      materials.add(row.material_description.trim().toLowerCase())
    }
  }
  return materials.size
}

export function calculateAverageOrderValue(data: NormalizedProcurementRow[]): number {
  if (data.length === 0) return 0
  const total = calculateTotalSpend(data)
  return total / data.length
}

