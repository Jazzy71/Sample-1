import { useNavigate } from "react-router-dom"
import { Circle, Loader2 } from "lucide-react"

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

const STEPS = [
  "Reading workbook structure",
  "Detecting sheets and columns",
  "Validating procurement data",
]

export function ProcessingPage() {
  const navigate = useNavigate()
  const { uploadedFileName, setWorkflowStage } = useAppState()

  const handleContinue = () => {
    setWorkflowStage("workbook-review")
    navigate("/workbook-understanding")
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
        </div>
        <CardTitle className="font-heading text-xl">
          Analyzing your workbook
        </CardTitle>
        <CardDescription>
          {uploadedFileName ?? "Your workbook"} is being prepared. This step
          will connect to the Excel intelligence engine in a later phase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {STEPS.map((step) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-lg border border-dashed px-3 py-2.5 text-sm text-muted-foreground"
            >
              <Circle className="size-3.5 shrink-0" aria-hidden="true" />
              {step}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleContinue}>Continue</Button>
      </CardFooter>
    </Card>
  )
}
