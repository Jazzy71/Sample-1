import { z } from "zod"

// The standardized format that Phase 3 Analytics expects.
export const procurementRowSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  vendor_name: z.string().nullable().optional(),
  material_description: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  unit_price: z.number().nullable().optional(),
  po_date: z.string().nullable().optional(),
  total_amount: z.number().nullable().optional(),
})

export type NormalizedProcurementRow = z.infer<typeof procurementRowSchema>

export const STANDARD_COLUMNS = [
  { key: "vendor_name", label: "Vendor Name" },
  { key: "material_description", label: "Material Description" },
  { key: "quantity", label: "Quantity" },
  { key: "unit_price", label: "Unit Price" },
  { key: "po_date", label: "PO Date" },
  { key: "total_amount", label: "Total Amount" },
] as const

export type StandardColumnKey = typeof STANDARD_COLUMNS[number]["key"]

