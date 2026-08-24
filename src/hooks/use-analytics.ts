import { useMemo } from "react"
import { useAppState } from "@/state/app-state-context"
import { 
  calculateTotalSpend, 
  countUniqueVendors, 
  countUniqueMaterials, 
  calculateAverageOrderValue 
} from "@/lib/analytics/kpis"
import { 
  getSpendByVendor, 
  getSpendByCategory, 
  getSpendOverTime 
} from "@/lib/analytics/aggregations"
import { generateInsights } from "@/lib/analytics/insights"

export function useAnalytics() {
  const { normalizedData } = useAppState()

  const hasData = normalizedData && normalizedData.length > 0

  const kpis = useMemo(() => {
    if (!hasData) return null
    return {
      totalSpend: calculateTotalSpend(normalizedData),
      uniqueVendors: countUniqueVendors(normalizedData),
      uniqueMaterials: countUniqueMaterials(normalizedData),
      averageOrderValue: calculateAverageOrderValue(normalizedData),
    }
  }, [normalizedData, hasData])

  const spendByVendor = useMemo(() => {
    if (!hasData) return []
    return getSpendByVendor(normalizedData)
  }, [normalizedData, hasData])

  const spendByCategory = useMemo(() => {
    if (!hasData) return []
    return getSpendByCategory(normalizedData)
  }, [normalizedData, hasData])

  const spendOverTime = useMemo(() => {
    if (!hasData) return []
    return getSpendOverTime(normalizedData)
  }, [normalizedData, hasData])

  const insights = useMemo(() => {
    if (!hasData) return []
    return generateInsights(normalizedData)
  }, [normalizedData, hasData])

  return {
    hasData,
    kpis,
    spendByVendor,
    spendByCategory,
    spendOverTime,
    insights,
    rawData: normalizedData
  }
}

