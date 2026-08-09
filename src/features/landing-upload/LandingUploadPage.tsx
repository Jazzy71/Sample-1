import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadZone } from "@/components/common/UploadZone"
import { useAppState } from "@/state/app-state-context"

export function LandingUploadPage() {
  const navigate = useNavigate()
  const { setWorkflowStage, setUploadedFileName } = useAppState()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleContinue = () => {
    if (!selectedFile) return
    setUploadedFileName(selectedFile.name)
    setWorkflowStage("uploading")
    navigate("/processing")
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-2xl">
          Turn procurement spreadsheets into spend intelligence
        </CardTitle>
        <CardDescription>
          Upload a procurement workbook to get started. ProcureLens will
          understand its structure and prepare it for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UploadZone onFileSelected={setSelectedFile} />
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleContinue} disabled={!selectedFile}>
          Continue <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
