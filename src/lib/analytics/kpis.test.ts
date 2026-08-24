import { describe, it, expect } from "vitest"
import { getDerivedTotalAmount, calculateTotalSpend, countUniqueVendors } from "./kpis"
import type { NormalizedProcurementRow } from "@/lib/excel/schema"

const mockData: NormalizedProcurementRow[] = [
  { id: "1", vendor_name: "Acme", quantity: 2, unit_price: 50, total_amount: 100 },
  { id: "2", vendor_name: "Acme", quantity: 1, unit_price: 150, total_amount: 150 },
  { id: "3", vendor_name: "Globex", quantity: 10, unit_price: 10, total_amount: null }, // missing total
]

describe("KPI Analytics", () => {
  it("getDerivedTotalAmount calculates correctly", () => {
    expect(getDerivedTotalAmount(mockData[0])).toBe(100)
    expect(getDerivedTotalAmount(mockData[2])).toBe(100) // 10 * 10
  })

  it("calculateTotalSpend sums correctly", () => {
    // 100 + 150 + 100 = 350
    expect(calculateTotalSpend(mockData)).toBe(350)
  })

  it("countUniqueVendors ignores duplicates and case", () => {
    expect(countUniqueVendors(mockData)).toBe(2)
  })
})

