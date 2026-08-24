import { describe, it, expect } from "vitest"
import { detectHeaders, mapColumns } from "./heuristics"

describe("Excel Heuristics", () => {
  describe("detectHeaders", () => {
    it("should find the row with known procurement keywords", () => {
      const rows = [
        ["Report Summary", "", ""],
        ["Run Date", "2024-01-01", ""],
        [], // empty row
        ["Vendor Name", "Material Description", "Qty", "Price", "Total"], // The header row
        ["Acme Corp", "Widget A", 10, 50, 500],
        ["Globex", "Widget B", 5, 20, 100],
      ]
      
      const { headerRowIndex, headers } = detectHeaders(rows)
      
      expect(headerRowIndex).toBe(3)
      expect(headers).toEqual(["Vendor Name", "Material Description", "Qty", "Price", "Total"])
    })
  })

  describe("mapColumns", () => {
    it("should map headers to standard schema keys with correct confidence", () => {
      const headers = ["Vendor Name", "Desc", "Quantity", "Unknown Col"]
      const mappings = mapColumns(headers)

      expect(mappings).toHaveLength(4)
      
      // "Vendor Name" is an exact synonym
      expect(mappings[0].mappedKey).toBe("vendor_name")
      expect(mappings[0].confidence).toBe("high")
      
      // "Desc" is an exact synonym
      expect(mappings[1].mappedKey).toBe("material_description")
      expect(mappings[1].confidence).toBe("high")
      
      // "Quantity" is an exact synonym
      expect(mappings[2].mappedKey).toBe("quantity")
      expect(mappings[2].confidence).toBe("high")
      
      // "Unknown Col" has no mapping
      expect(mappings[3].mappedKey).toBeNull()
      expect(mappings[3].confidence).toBe("none")
    })
  })
})

