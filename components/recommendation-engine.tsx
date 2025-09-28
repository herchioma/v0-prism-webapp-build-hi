"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ArrowRight, Clock, Target } from "lucide-react"

const recommendations = [
  {
    id: "1",
    type: "engagement",
    priority: "high",
    title: "Engage with positive trend",
    description: "Product launch mentions are trending with 78% positive sentiment",
    action: "Create social media campaign highlighting user testimonials",
    impact: "Potential 25% increase in positive mentions",
    timeframe: "Next 2 hours",
    effort: "Low",
  },
  {
    id: "2",
    type: "crisis",
    priority: "high",
    title: "Address service concerns",
    description: "Customer service complaints spiking in the last 2 hours",
    action: "Deploy additional support agents and post public acknowledgment",
    impact: "Reduce negative sentiment by 40%",
    timeframe: "Immediate",
    effort: "Medium",
  },
  {
    id: "3",
    type: "competitive",
    priority: "medium",
    title: "Counter competitor narrative",
    description: "Competitor XYZ gaining traction with feature comparisons",
    action: "Publish comparison guide highlighting your unique advantages",
    impact: "Maintain market position",
    timeframe: "Next 24 hours",
    effort: "High",
  },
]

export function RecommendationEngine() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "engagement":
        return "text-green-500 bg-green-500/10"
      case "crisis":
        return "text-red-500 bg-red-500/10"
      case "competitive":
        return "text-blue-500 bg-blue-500/10"
      default:
        return "text-gray-500 bg-gray-500/10"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="glow-border">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">Smart actions based on current sentiment trends</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium text-sm">{rec.title}</h5>
                    <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                      {rec.priority}
                    </Badge>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getTypeColor(rec.type)}`}
                  >
                    <Target className="h-3 w-3" />
                    {rec.type}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{rec.description}</p>

              <div className="bg-primary/5 p-2 rounded text-xs">
                <strong>Action:</strong> {rec.action}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Impact:</span>
                  <div className="font-medium text-green-500">{rec.impact}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Effort:</span>
                  <div className="font-medium">{rec.effort}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {rec.timeframe}
                </div>
                <Button size="sm" className="text-xs h-7">
                  Take Action
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
