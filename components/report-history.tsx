"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, Download, Eye, Trash2 } from "lucide-react"

const reportHistory = [
  {
    id: "1",
    name: "Weekly Sentiment Report",
    type: "Comprehensive",
    format: "PDF",
    date: "2024-01-15",
    size: "2.4 MB",
    status: "completed",
  },
  {
    id: "2",
    name: "Q4 Executive Summary",
    type: "Executive",
    format: "PPT",
    date: "2024-01-10",
    size: "5.1 MB",
    status: "completed",
  },
  {
    id: "3",
    name: "Competitor Analysis",
    type: "Competitive",
    format: "PDF",
    date: "2024-01-08",
    size: "3.7 MB",
    status: "completed",
  },
  {
    id: "4",
    name: "Monthly Trends Report",
    type: "Technical",
    format: "Excel",
    date: "2024-01-05",
    size: "1.8 MB",
    status: "generating",
  },
]

export function ReportHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Reports
        </CardTitle>
        <p className="text-sm text-muted-foreground">Download or manage previous reports</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {reportHistory.map((report) => (
          <div key={report.id} className="p-3 rounded-lg border border-border">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm">{report.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {report.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {report.format}
                    </Badge>
                    <Badge variant={report.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {report.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{report.date}</span>
                <span>{report.size}</span>
              </div>

              {report.status === "completed" && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-500 hover:text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {report.status === "generating" && (
                <div className="flex items-center gap-2">
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">75%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
