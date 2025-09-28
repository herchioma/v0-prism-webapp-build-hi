"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, BarChart3, TrendingUp, AlertTriangle } from "lucide-react"

export function ReportPreview() {
  const previewSections = [
    {
      title: "Executive Summary",
      icon: FileText,
      content: "Overall sentiment improved by 12% this week with 2,847 total mentions...",
      status: "included",
    },
    {
      title: "Trend Analysis",
      icon: TrendingUp,
      content: "Positive sentiment trending upward with key drivers being product quality...",
      status: "included",
    },
    {
      title: "Key Metrics",
      icon: BarChart3,
      content: "Sentiment Score: 72% | Mention Volume: +8.2% | Risk Level: Medium...",
      status: "included",
    },
    {
      title: "Alert Summary",
      icon: AlertTriangle,
      content: "7 active alerts identified, 3 high-priority items requiring immediate attention...",
      status: "included",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Report Preview
        </CardTitle>
        <p className="text-sm text-muted-foreground">Preview of your generated report content</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-secondary/20 rounded-lg border-2 border-dashed border-border">
          <div className="text-center space-y-2">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
            <h3 className="font-medium">Comprehensive Sentiment Analysis Report</h3>
            <p className="text-sm text-muted-foreground">January 1-15, 2024 | Generated on January 15, 2024</p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline">PDF Format</Badge>
              <Badge variant="outline">18 Pages</Badge>
              <Badge variant="outline">Executive Level</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Report Sections</h4>
          {previewSections.map((section, index) => (
            <div key={index} className="p-3 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <section.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm">{section.title}</h5>
                    <Badge variant="default" className="text-xs">
                      {section.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-primary/5 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong className="text-primary">Note:</strong> This is a preview of your report structure. The actual
            report will contain detailed charts, graphs, and comprehensive analysis based on your selected date range
            and configuration.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
