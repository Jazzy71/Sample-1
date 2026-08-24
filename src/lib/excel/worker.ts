import { read, utils } from "xlsx"
import { detectHeaders, mapColumns, type ColumnMapping } from "./heuristics"

export type WorkerMessageType = "START" | "PROGRESS" | "SUCCESS" | "ERROR"

export interface WorkerMessage {
  type: WorkerMessageType
  payload?: any
}

export interface ParseResult {
  sheetName: string
  rowCount: number
  headers: string[]
  mappings: ColumnMapping[]
  rawData: any[][]
}

self.onmessage = async (e: MessageEvent) => {
  const file = e.data as File
  if (!file) return

  try {
    self.postMessage({ type: "PROGRESS", payload: "Reading workbook..." })
    
    const arrayBuffer = await file.arrayBuffer()
    const workbook = read(arrayBuffer, { type: "array" })
    
    self.postMessage({ type: "PROGRESS", payload: "Detecting sheets..." })
    
    let bestSheetName = workbook.SheetNames[0]
    let maxRows = 0
    let bestSheetData: any[][] = []

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName]
      const data = utils.sheet_to_json<any[]>(sheet, { header: 1, blankrows: false })
      if (data.length > maxRows) {
        maxRows = data.length
        bestSheetName = sheetName
        bestSheetData = data
      }
    }

    self.postMessage({ type: "PROGRESS", payload: "Analyzing structure..." })

    const { headerRowIndex, headers } = detectHeaders(bestSheetData)
    const mappings = mapColumns(headers)

    const rawData = bestSheetData.slice(headerRowIndex + 1).filter(row => row.length > 0)

    const result: ParseResult = {
      sheetName: bestSheetName,
      rowCount: rawData.length,
      headers,
      mappings,
      rawData
    }

    self.postMessage({ type: "SUCCESS", payload: result })
  } catch (error) {
    self.postMessage({ 
      type: "ERROR", 
      payload: error instanceof Error ? error.message : "Unknown error parsing file" 
    })
  }
}

