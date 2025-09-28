import { DashboardLayout } from "@/components/dashboard-layout"
import { ForecastOverview } from "@/components/forecast-overview"
import { PredictiveChart } from "@/components/predictive-chart"
import { RiskMeter } from "@/components/risk-meter"
import { ForecastInsights } from "@/components/forecast-insights"
import { ScenarioAnalysis } from "@/components/scenario-analysis"

export default function ForecastPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">AI-Powered Forecasting</h1>
          <p className="text-muted-foreground text-pretty">
            Predict sentiment trends and identify potential risks with advanced AI analysis
          </p>
        </div>

        <ForecastOverview />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PredictiveChart />
          </div>
          <div>
            <RiskMeter />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ForecastInsights />
          <ScenarioAnalysis />
        </div>
      </div>
    </DashboardLayout>
  )
}
