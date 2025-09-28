import { DashboardLayout } from "@/components/dashboard-layout"
import { SentimentTrends } from "@/components/sentiment-trends"
import { WordCloud } from "@/components/word-cloud"
import { CompetitorComparison } from "@/components/competitor-comparison"
import { TrendMetrics } from "@/components/trend-metrics"

export default function TrendsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">Sentiment Trends</h1>
          <p className="text-muted-foreground text-pretty">Analyze sentiment patterns and trending topics over time</p>
        </div>

        <TrendMetrics />

        <div className="grid gap-6 lg:grid-cols-2">
          <SentimentTrends />
          <WordCloud />
        </div>

        <CompetitorComparison />
      </div>
    </DashboardLayout>
  )
}
