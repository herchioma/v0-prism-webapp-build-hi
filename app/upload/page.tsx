"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DatasetUpload } from "@/components/dataset-upload"
import { AnalysisResults } from "@/components/analysis-results"
import { useState } from "react"

export interface AnalysisData {
  filename: string
  rows: number
  columns: number
  missingValues: number
  preview: any[]
  textColumns: string[]
  baselineSentiment: any[]
  ragSentiment: any[]
  explanations: any[]
  sentimentDistribution: {
    baseline: { positive: number; negative: number; neutral: number }
    rag: { positive: number; negative: number; neutral: number }
  }
  wordClouds: {
    positive: Array<{ text: string; value: number }>
    negative: Array<{ text: string; value: number }>
    neutral: Array<{ text: string; value: number }>
  }
  tweetExtraction?: {
    totalTweets: number
    extractedTweets: string[]
    previewTweets: string[]
  }
}

export default function UploadPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">Upload</h1>
          <p className="text-muted-foreground text-pretty">
            Upload your dataset or document for advanced sentiment analysis with RAG-enhanced predictions
          </p>
        </div>

        {!analysisData ? (
          <DatasetUpload
            onAnalysisComplete={setAnalysisData}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        ) : (
          <AnalysisResults data={analysisData} onNewUpload={() => setAnalysisData(null)} />
        )}
      </div>
    </DashboardLayout>
  )
}
