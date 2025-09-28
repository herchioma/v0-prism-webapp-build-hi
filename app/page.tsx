import { DashboardLayout } from "@/components/dashboard-layout"
import { SentimentGauge } from "@/components/sentiment-gauge"
import { SnapshotCards } from "@/components/snapshot-cards"
import { RecentAlerts } from "@/components/recent-alerts"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">Sentiment Overview</h1>
          <p className="text-muted-foreground text-pretty">
            Monitor your brand's public sentiment and get AI-powered insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <SentimentGauge />
          </div>
          <div className="md:col-span-2">
            <SnapshotCards />
          </div>
        </div>

        <RecentAlerts />
      </div>
    </DashboardLayout>
  )
}
