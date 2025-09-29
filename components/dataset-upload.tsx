'use client'

import { useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'

interface TweetItem {
  id: number
  text: string
}

interface TweetsData {
  filename?: string
  extractedAt?: string
  totalItems: number
  items: TweetItem[]
}

interface DatasetUploadProps {
  onExtractionComplete: (data: TweetsData) => void
  isExtracting: boolean
  setIsExtracting: (extracting: boolean) => void
}

export function DatasetUpload({
  onExtractionComplete,
  isExtracting,
  setIsExtracting,
}: DatasetUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  })

  const extractFromPDF = async () => {
    if (!uploadedFile) return

    setIsExtracting(true)
    setProgress(0)
    setError(null)

    const steps = [
      'Uploading PDF file...',
      'Parsing PDF content...',
      'Extracting numbered text items...',
      'Saving to tweets.json...',
      'Finalizing extraction...',
    ]

    try {
      // Simulate progress through steps
      for (let i = 0; i < steps.length - 1; i++) {
        setCurrentStep(steps[i])
        setProgress(((i + 1) / steps.length) * 80) // 80% for processing
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      // Create form data and upload
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to extract text from PDF')
      }

      // Final step
      setCurrentStep(steps[steps.length - 1])
      setProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Success
      onExtractionComplete(result)
    } catch (error) {
      console.error('PDF extraction error:', error)
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to extract text from PDF',
      )
    } finally {
      setIsExtracting(false)
    }
  }

  if (isExtracting) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 animate-pulse text-primary" />
            Extracting Text from PDF
          </CardTitle>
          <CardDescription>
            Processing your PDF and extracting numbered text items
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentStep}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>
            Upload a PDF containing numbered text items (1. 2. 3. etc.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50',
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary">Drop your PDF here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground">Drag & drop your PDF here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
            )}
          </div>

          {uploadedFile && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">{uploadedFile.name}</span>
                <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          )}

          <Button
            onClick={extractFromPDF}
            disabled={!uploadedFile}
            className="w-full mt-4"
          >
            Extract Text Items
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">PDF Text Extraction</p>
                <p className="text-sm text-muted-foreground">
                  Automatically extracts text from your PDF document
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Numbered Item Detection</p>
                <p className="text-sm text-muted-foreground">
                  Finds and organizes text items numbered 1. 2. 3. etc.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Editable Text List</p>
                <p className="text-sm text-muted-foreground">
                  Edit, delete, or manage individual text items
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">JSON Export</p>
                <p className="text-sm text-muted-foreground">
                  Automatically saves to data/tweets.json file
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">File Replacement</p>
                <p className="text-sm text-muted-foreground">
                  New uploads replace existing content automatically
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
