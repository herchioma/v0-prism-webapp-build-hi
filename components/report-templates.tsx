"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookTemplate as Template, FileText, Presentation, BarChart3, Users } from "lucide-react"

const templates = [
  {
    id: "executive",
    name: "Executive Summary",
    description: "High-level overview for leadership",
    icon: FileText,
    format: "PDF",
    pages: "3-5 pages",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "detailed",
    name: "Detailed Analysis",
    description: "Comprehensive technical report",
    icon: BarChart3,
    format: "PDF",
    pages: "15-20 pages",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "presentation",
    name: "Board Presentation",
    description: "PowerPoint for stakeholders",
    icon: Presentation,
    format: "PPT",
    pages: "12-15 slides",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "competitive",
    name: "Competitive Report",
    description: "Market position analysis",
    icon: Users,
    format: "PDF",
    pages: "8-10 pages",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

export function ReportTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Template className="h-5 w-5" />
          Report Templates
        </CardTitle>
        <p className="text-sm text-muted-foreground">Quick start with pre-built templates</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full ${template.bgColor} flex items-center justify-center flex-shrink-0`}
              >
                <template.icon className={`h-4 w-4 ${template.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {template.format}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{template.description}</p>
                <p className="text-xs text-muted-foreground">{template.pages}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="w-full mt-2 text-xs">
              Use Template
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
