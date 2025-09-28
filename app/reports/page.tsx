import { DashboardLayout } from "@/components/dashboard-layout"
import { ReportGenerator } from "@/components/report-generator"
import { ReportTemplates } from "@/components/report-templates"
import { ReportHistory } from "@/components/report-history"
import { ReportPreview } from "@/components/report-preview"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">Reports & Export</h1>
          <p className="text-muted-foreground text-pretty">
            Generate comprehensive sentiment analysis reports and export insights
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ReportGenerator />
            <ReportPreview />
          </div>
          <div className="space-y-6">
            <ReportTemplates />
            <ReportHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
