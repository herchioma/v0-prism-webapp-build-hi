"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SentimentGauge() {
  // Mock data - replace with real sentiment data
  const sentimentScore = 72 // 0-100 scale
  const sentimentLabel = sentimentScore >= 70 ? "Positive" : sentimentScore >= 40 ? "Neutral" : "Negative"
  const sentimentColor =
    sentimentScore >= 70 ? "text-green-500" : sentimentScore >= 40 ? "text-yellow-500" : "text-red-500"

  return (
    <Card className="glow-border">
      <CardHeader>
        <CardTitle className="text-lg font-display">Overall Sentiment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          {/* Gauge background */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted opacity-20"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(sentimentScore / 100) * 314} 314`}
              className="text-primary transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold font-display">{sentimentScore}%</div>
              <div className={`text-sm font-medium ${sentimentColor}`}>{sentimentLabel}</div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Based on 2,847 mentions in the last 24 hours</p>
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Positive: 45%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Neutral: 27%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Negative: 28%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
