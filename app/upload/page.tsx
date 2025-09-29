'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { DatasetUpload } from '@/components/dataset-upload'
import { TextEditor } from '@/components/text-editor'
import { useState, useEffect } from 'react'

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

export default function UploadPage() {
  const [tweetsData, setTweetsData] = useState<TweetsData | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)

  // Load existing tweets on component mount
  useEffect(() => {
    loadExistingTweets()
  }, [])

  const loadExistingTweets = async () => {
    try {
      const response = await fetch('/api/tweets')
      if (response.ok) {
        const data = await response.json()
        if (data.items && data.items.length > 0) {
          setTweetsData(data)
        }
      }
    } catch (error) {
      console.error('Error loading existing tweets:', error)
    }
  }

  const handleExtractionComplete = (data: TweetsData) => {
    setTweetsData(data)
  }

  const handleNewUpload = () => {
    setTweetsData(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">
            PDF Text Extractor
          </h1>
          <p className="text-muted-foreground text-pretty">
            Upload a PDF with numbered text items (1. 2. 3. etc.) to extract,
            edit, and manage them
          </p>
        </div>

        {!tweetsData ? (
          <DatasetUpload
            onExtractionComplete={handleExtractionComplete}
            isExtracting={isExtracting}
            setIsExtracting={setIsExtracting}
          />
        ) : (
          <TextEditor
            data={tweetsData}
            onDataUpdate={setTweetsData}
            onNewUpload={handleNewUpload}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
