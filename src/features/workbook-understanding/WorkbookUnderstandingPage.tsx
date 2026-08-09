import { useNavigate } from "react-router-dom"
import { ArrowRight, FileSpreadsheet } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/common/EmptyState"
import { DataMappingShell } from "@/components/common/DataMappingShell"
import { useAppState } from "@/state/app-state-context"

export function WorkbookUnderstandingPage() {
  const navigate = useNavigate()
  const { uploadedFileName, setWorkflowStage } = useAppState()

  const handleContinue = () => {
    setWorkflowStage("ready")
    navigate("/overview")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FileSpreadsheet className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <CardTitle>{uploadedFileName ?? "Workbook"}</CardTitle>
              <CardDescription>
                Sheet structure and detected columns will be summarized here.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="Sheet preview not yet available"
            description="Sheet and column detection is part of the Phase 2 Excel intelligence engine."
          />
        </CardContent>
      </Card>

      <DataMappingShell />

      <div className="flex justify-end">
        <Button onClick={handleContinue}>
          Continue to Dashboard <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
