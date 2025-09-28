"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import type { AnalysisData } from "@/app/upload/page"

interface DatasetUploadProps {
  onAnalysisComplete: (data: AnalysisData) => void
  isAnalyzing: boolean
  setIsAnalyzing: (analyzing: boolean) => void
}

export function DatasetUpload({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }: DatasetUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/json": [".json"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const analyzeDataset = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setProgress(0)
    setCurrentStep("Uploading file...")

    try {
      const isDocumentFile =
        uploadedFile.name.toLowerCase().endsWith(".docx") || uploadedFile.name.toLowerCase().endsWith(".pdf")

      const steps = isDocumentFile
        ? [
            "Uploading file...",
            "Extracting tweets from document...",
            "Cleaning and structuring tweets...",
            "Running baseline sentiment analysis...",
            "Running RAG-enhanced analysis...",
            "Generating explanations...",
            "Creating visualizations...",
          ]
        : [
            "Uploading file...",
            "Parsing dataset...",
            "Detecting text columns...",
            "Running baseline sentiment analysis...",
            "Running RAG-enhanced analysis...",
            "Generating explanations...",
            "Creating visualizations...",
          ]

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i])
        setProgress(((i + 1) / steps.length) * 100)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      const mockTweets = [
        "I love this new product! It's absolutely amazing and exceeded all my expectations.",
        "Terrible customer service experience. Very disappointed with the quality.",
        "The product is okay, nothing special but does what it's supposed to do.",
        "Excellent support team! They helped me resolve my issue quickly.",
        "Poor quality for the price. I expected much better from this brand.",
        "Amazing features and great user interface. Highly recommend!",
        "Not worth the money. There are better alternatives available.",
        "Good product overall, but could use some improvements in design.",
        "Outstanding quality and fast delivery. Will definitely buy again!",
        "Average product, meets basic requirements but lacks innovation.",
      ]

      const mockResults: AnalysisData = {
        filename: uploadedFile.name,
        rows: isDocumentFile ? mockTweets.length : 1000,
        columns: isDocumentFile ? 1 : 5,
        missingValues: isDocumentFile ? 0 : 23,
        preview: isDocumentFile
          ? mockTweets.slice(0, 5).map((tweet, index) => ({ id: index + 1, text: tweet }))
          : [
              { id: 1, text: "I love this product! Amazing quality.", rating: 5, category: "electronics" },
              { id: 2, text: "Terrible service, very disappointed.", rating: 1, category: "service" },
              { id: 3, text: "It's okay, nothing special.", rating: 3, category: "general" },
              { id: 4, text: "Excellent customer support team!", rating: 5, category: "service" },
              { id: 5, text: "Poor quality for the price.", rating: 2, category: "electronics" },
            ],
        textColumns: ["text"],
        ...(isDocumentFile && {
          tweetExtraction: {
            totalTweets: mockTweets.length,
            extractedTweets: mockTweets,
            previewTweets: mockTweets.slice(0, 5),
          },
        }),
        baselineSentiment: [
          { text: "I love this product! Amazing quality.", sentiment: "POSITIVE", confidence: 0.95 },
          { text: "Terrible service, very disappointed.", sentiment: "NEGATIVE", confidence: 0.89 },
          { text: "It's okay, nothing special.", sentiment: "NEUTRAL", confidence: 0.67 },
        ],
        ragSentiment: [
          { text: "I love this product! Amazing quality.", sentiment: "POSITIVE", confidence: 0.98 },
          { text: "Terrible service, very disappointed.", sentiment: "NEGATIVE", confidence: 0.94 },
          { text: "It's okay, nothing special.", sentiment: "NEUTRAL", confidence: 0.78 },
        ],
        explanations: [
          {
            text: "I love this product! Amazing quality.",
            explanation: "Keywords 'love', 'amazing', 'quality' indicate strong positive sentiment",
          },
          {
            text: "Terrible service, very disappointed.",
            explanation: "Keywords 'terrible', 'disappointed' indicate strong negative sentiment",
          },
          { text: "It's okay, nothing special.", explanation: "Neutral language with no strong emotional indicators" },
        ],
        sentimentDistribution: {
          baseline: { positive: 45, negative: 30, neutral: 25 },
          rag: { positive: 48, negative: 28, neutral: 24 },
        },
        wordClouds: {
          positive: [
            { text: "love", value: 45 },
            { text: "amazing", value: 38 },
            { text: "excellent", value: 32 },
            { text: "great", value: 28 },
            { text: "wonderful", value: 25 },
          ],
          negative: [
            { text: "terrible", value: 42 },
            { text: "disappointed", value: 35 },
            { text: "poor", value: 30 },
            { text: "bad", value: 28 },
            { text: "awful", value: 22 },
          ],
          neutral: [
            { text: "okay", value: 25 },
            { text: "average", value: 20 },
            { text: "normal", value: 18 },
            { text: "standard", value: 15 },
            { text: "typical", value: 12 },
          ],
        },
      }

      setCurrentStep("Analysis complete!")
      onAnalysisComplete(mockResults)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 animate-pulse text-primary" />
            Analyzing Dataset
          </CardTitle>
          <CardDescription>Processing your data with advanced sentiment analysis</CardDescription>
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
            Upload
          </CardTitle>
          <CardDescription>Supported formats: CSV, Excel (.xlsx), JSON, Word (.docx), PDF (.pdf)</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary">Drop your file here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground">Drag & drop your dataset here</p>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
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
              <p className="text-sm text-muted-foreground mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}

          <Button onClick={analyzeDataset} disabled={!uploadedFile} className="w-full mt-4">
            Start Analysis
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Analysis Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Dataset Preview</p>
                <p className="text-sm text-muted-foreground">View rows, columns, missing values, and sample data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Dual Sentiment Analysis</p>
                <p className="text-sm text-muted-foreground">Compare baseline vs RAG-enhanced predictions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Explainable AI</p>
                <p className="text-sm text-muted-foreground">Understand why each prediction was made</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Visual Analytics</p>
                <p className="text-sm text-muted-foreground">Charts, word clouds, and distribution analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Export Results</p>
                <p className="text-sm text-muted-foreground">Download enhanced CSV and PDF reports</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
