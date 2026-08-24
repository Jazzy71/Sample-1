import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Circle, Loader2, CheckCircle, AlertTriangle } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/state/app-state-context"

import ExcelWorker from "@/lib/excel/worker?worker"
import type { WorkerMessage } from "@/lib/excel/worker"

export function ProcessingPage() {
  const navigate = useNavigate()
  const { uploadedFile, setWorkflowStage, setParseResult } = useAppState()
  
  const [status, setStatus] = useState<string>("Initializing...")
  const [error, setError] = useState<string | null>(null)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!uploadedFile) {
      navigate("/")
      return
    }

    const worker = new ExcelWorker()

    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const msg = e.data
      if (msg.type === "PROGRESS") {
        setStatus(msg.payload)
      } else if (msg.type === "SUCCESS") {
        setParseResult(msg.payload)
        setStatus("Processing complete")
        setIsDone(true)
        worker.terminate()
      } else if (msg.type === "ERROR") {
        setError(msg.payload)
        setStatus("Processing failed")
        setIsDone(true)
        worker.terminate()
      }
    }

    worker.postMessage(uploadedFile)

    return () => {
      worker.terminate()
    }
  }, [uploadedFile, navigate, setParseResult])

  const handleContinue = () => {
    setWorkflowStage("workbook-review")
    navigate("/workbook-understanding")
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          {!isDone ? (
            <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
          ) : error ? (
            <AlertTriangle className="size-6 text-destructive" aria-hidden="true" />
          ) : (
            <CheckCircle className="size-6 text-primary" aria-hidden="true" />
          )}
        </div>
        <CardTitle className="font-heading text-xl">
          Analyzing your workbook
        </CardTitle>
        <CardDescription>
          {uploadedFile?.name ?? "Your workbook"} is being processed by the Excel intelligence engine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 rounded-lg border border-dashed px-3 py-2.5 text-sm text-muted-foreground">
          <Circle className="size-3.5 shrink-0" aria-hidden="true" />
          {status}
        </div>
        {error && (
          <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleContinue} disabled={!isDone || !!error}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}
