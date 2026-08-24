import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import type { WorkflowStage } from "@/types/workflow"
import type { ParseResult } from "@/lib/excel/worker"
import type { NormalizedProcurementRow } from "@/lib/excel/schema"

interface AppStateContextValue {
  workflowStage: WorkflowStage
  setWorkflowStage: (stage: WorkflowStage) => void
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
  parseResult: ParseResult | null
  setParseResult: (result: ParseResult | null) => void
  normalizedData: NormalizedProcurementRow[]
  setNormalizedData: (data: NormalizedProcurementRow[]) => void
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>("idle")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [normalizedData, setNormalizedData] = useState<NormalizedProcurementRow[]>([])

  const value = useMemo(
    () => ({
      workflowStage,
      setWorkflowStage,
      uploadedFile,
      setUploadedFile,
      parseResult,
      setParseResult,
      normalizedData,
      setNormalizedData,
    }),
    [workflowStage, uploadedFile, parseResult, normalizedData]
  )

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}
