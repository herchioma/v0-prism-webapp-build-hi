"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileText, Download, CalendarIcon, Settings } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

export function ReportGenerator() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("comprehensive")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [selectedSections, setSelectedSections] = useState({
    overview: true,
    trends: true,
    alerts: true,
    forecast: true,
    recommendations: true,
    competitors: false,
  })

  const reportSections = [
    { id: "overview", label: "Executive Summary", description: "High-level sentiment overview" },
    { id: "trends", label: "Trend Analysis", description: "Detailed sentiment trends and patterns" },
    { id: "alerts", label: "Alert Summary", description: "Key alerts and responses" },
    { id: "forecast", label: "Forecasting", description: "AI-powered predictions and insights" },
    { id: "recommendations", label: "Recommendations", description: "Actionable insights and next steps" },
    { id: "competitors", label: "Competitor Analysis", description: "Competitive sentiment comparison" },
  ]

  const handleSectionChange = (sectionId: string, checked: boolean) => {
    setSelectedSections((prev) => ({ ...prev, [sectionId]: checked }))
  }

  return (
    <Card className="glow-border">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate Report
        </CardTitle>
        <p className="text-sm text-muted-foreground">Create custom sentiment analysis reports</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Configuration */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                <SelectItem value="executive">Executive Summary</SelectItem>
                <SelectItem value="technical">Technical Deep Dive</SelectItem>
                <SelectItem value="competitive">Competitive Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="ppt">PowerPoint Presentation</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV Data Export</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="flex items-center text-muted-foreground">to</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Report Sections */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Include Sections</label>
          <div className="grid gap-3 md:grid-cols-2">
            {reportSections.map((section) => (
              <div key={section.id} className="flex items-start space-x-2">
                <Checkbox
                  id={section.id}
                  checked={selectedSections[section.id as keyof typeof selectedSections]}
                  onCheckedChange={(checked) => handleSectionChange(section.id, checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor={section.id} className="text-sm font-medium leading-none cursor-pointer">
                    {section.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generation Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>

        {/* Report Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold font-display">2,847</div>
            <div className="text-xs text-muted-foreground">Total Mentions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold font-display">72%</div>
            <div className="text-xs text-muted-foreground">Avg Sentiment</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold font-display">15</div>
            <div className="text-xs text-muted-foreground">Key Insights</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
