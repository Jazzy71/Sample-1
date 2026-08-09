import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import type { WorkflowStage } from "@/types/workflow"

interface AppStateContextValue {
  workflowStage: WorkflowStage
  setWorkflowStage: (stage: WorkflowStage) => void
  uploadedFileName: string | null
  setUploadedFileName: (name: string | null) => void
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>("idle")
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      workflowStage,
      setWorkflowStage,
      uploadedFileName,
      setUploadedFileName,
    }),
    [workflowStage, uploadedFileName]
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
