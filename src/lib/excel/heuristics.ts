import type { StandardColumnKey } from "./schema"

// A mapping of our standard fields to common variations found in messy Excel sheets
const SYNONYM_DICTIONARY: Record<StandardColumnKey, string[]> = {
  vendor_name: ["vendor", "supplier", "company", "vendor name", "supplier name"],
  material_description: ["description", "material", "item", "item name", "product", "part", "material description", "desc"],
  quantity: ["qty", "quantity", "count"],
  unit_price: ["price", "unit price", "rate", "cost", "unit cost"],
  po_date: ["date", "po date", "order date", "purchased on", "document date"],
  total_amount: ["total", "total amount", "total price", "sum", "extended price", "net value", "amount"]
}

export interface ColumnMapping {
  originalHeader: string
  columnIndex: number
  mappedKey: StandardColumnKey | null
  confidence: "high" | "low" | "none"
}

export function detectHeaders(rows: any[][]): { headerRowIndex: number, headers: string[] } {
  let bestRowIndex = 0
  let maxScore = -1
  let bestHeaders: string[] = []

  const maxRowsToInspect = Math.min(rows.length, 20)
  
  for (let i = 0; i < maxRowsToInspect; i++) {
    const row = rows[i]
    if (!row || !Array.isArray(row)) continue

    let score = 0
    const stringVals = row.map(v => v ? String(v).trim().toLowerCase() : "")
    
    const nonEmptyStrings = stringVals.filter(v => v.length > 0).length
    
    const allSynonyms = Object.values(SYNONYM_DICTIONARY).flat()
    for (const val of stringVals) {
      if (allSynonyms.includes(val)) {
        score += 5
      }
    }
    
    score += nonEmptyStrings

    if (score > maxScore && nonEmptyStrings > 0) {
      maxScore = score
      bestRowIndex = i
      bestHeaders = row.map(v => v ? String(v).trim() : "")
    }
  }

  // If no good header row is found, default to first row
  if (maxScore === -1 && rows.length > 0) {
    bestHeaders = rows[0].map(v => v ? String(v).trim() : "")
  }

  return { headerRowIndex: bestRowIndex, headers: bestHeaders }
}

export function mapColumns(headers: string[]): ColumnMapping[] {
  return headers.map((header, index) => {
    if (!header) {
      return { originalHeader: `Column ${index + 1}`, columnIndex: index, mappedKey: null, confidence: "none" }
    }

    const lowerHeader = header.toLowerCase().trim()
    
    for (const [key, synonyms] of Object.entries(SYNONYM_DICTIONARY)) {
      if (synonyms.includes(lowerHeader)) {
        return {
          originalHeader: header,
          columnIndex: index,
          mappedKey: key as StandardColumnKey,
          confidence: "high"
        }
      }
    }
    
    for (const [key, synonyms] of Object.entries(SYNONYM_DICTIONARY)) {
      for (const syn of synonyms) {
        if (lowerHeader.includes(syn) || syn.includes(lowerHeader)) {
          return {
            originalHeader: header,
            columnIndex: index,
            mappedKey: key as StandardColumnKey,
            confidence: "low"
          }
        }
      }
    }

    return {
      originalHeader: header,
      columnIndex: index,
      mappedKey: null,
      confidence: "none"
    }
  })
}

