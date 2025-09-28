import { DashboardLayout } from "@/components/dashboard-layout"
import { AlertsOverview } from "@/components/alerts-overview"
import { AlertsFeed } from "@/components/alerts-feed"
import { AlertSettings } from "@/components/alert-settings"
import { RecommendationEngine } from "@/components/recommendation-engine"

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">Alerts & Recommendations</h1>
          <p className="text-muted-foreground text-pretty">
            Stay informed about sentiment changes and get AI-powered action recommendations
          </p>
        </div>

        <AlertsOverview />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AlertsFeed />
          </div>
          <div className="space-y-6">
            <RecommendationEngine />
            <AlertSettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
