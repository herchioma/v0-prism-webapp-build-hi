"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Users, MessageSquare } from "lucide-react"

const insights = [
  {
    id: "1",
    type: "trend",
    confidence: "High",
    title: "Positive Momentum Building",
    description:
      "Recent product updates are generating increasingly positive sentiment. User satisfaction scores have improved by 15% over the past week.",
    impact: "Expected 12% sentiment increase over next 7 days",
    factors: ["Product improvements", "Reduced complaints", "Positive reviews"],
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    id: "2",
    type: "risk",
    confidence: "Medium",
    title: "Service Capacity Concerns",
    description:
      "Support ticket volume is approaching historical peaks. Response times may increase if current trend continues.",
    impact: "Potential 8% sentiment decrease if unaddressed",
    factors: ["Increased ticket volume", "Limited support staff", "Peak season approaching"],
    icon: Users,
    color: "text-yellow-500",
  },
  {
    id: "3",
    type: "opportunity",
    confidence: "High",
    title: "Viral Content Potential",
    description:
      "Current positive discussions show characteristics of viral content. Strategic amplification could significantly boost brand awareness.",
    impact: "Potential 25% increase in positive mentions",
    factors: ["High engagement rate", "Influencer participation", "Trending hashtags"],
    icon: MessageSquare,
    color: "text-blue-500",
  },
]

export function ForecastInsights() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "trend":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "risk":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "opportunity":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground">Detailed analysis and predictions based on current data</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 rounded-lg border border-border hover:bg-secondary/20 transition-colors">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <insight.icon className={`h-4 w-4 ${insight.color}`} />
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getConfidenceColor(insight.confidence)} className="text-xs">
                    {insight.confidence}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getTypeColor(insight.type)}`}>
                    {insight.type}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{insight.description}</p>

              <div className="bg-primary/5 p-2 rounded text-xs">
                <strong>Predicted Impact:</strong> {insight.impact}
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-medium">Key Factors:</h5>
                <div className="flex flex-wrap gap-1">
                  {insight.factors.map((factor, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
