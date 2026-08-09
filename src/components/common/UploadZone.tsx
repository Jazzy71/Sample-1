import { useCallback, useRef, useState, type DragEvent } from "react"
import { FileSpreadsheet, UploadCloud, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  /**
   * Receives the selected File for display purposes only. Phase 1 never
   * reads or parses its contents — that arrives with the Phase 2 Excel
   * intelligence engine.
   */
  onFileSelected?: (file: File | null) => void
  accept?: string
  className?: string
}

export function UploadZone({
  onFileSelected,
  accept = ".xlsx,.xls,.csv",
  className,
}: UploadZoneProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File | null) => {
      setFileName(file?.name ?? null)
      onFileSelected?.(file)
    },
    [onFileSelected]
  )

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragActive(false)
      const file = event.dataTransfer.files?.[0] ?? null
      handleFile(file)
    },
    [handleFile]
  )

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragActive(true)
      }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-border",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
      />

      {fileName ? (
        <>
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <FileSpreadsheet className="size-6 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{fileName}</p>
            <p className="text-xs text-muted-foreground">Ready to analyze</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              handleFile(null)
              if (inputRef.current) inputRef.current.value = ""
            }}
          >
            <X /> Remove file
          </Button>
        </>
      ) : (
        <>
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <UploadCloud className="size-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Drag and drop your procurement workbook here
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .xlsx, .xls and .csv files
            </p>
          </div>
          <Button size="sm" onClick={() => inputRef.current?.click()}>
            Browse files
          </Button>
        </>
      )}
    </div>
  )
}
