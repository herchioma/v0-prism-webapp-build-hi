"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Users, MessageSquare, ExternalLink, CheckCircle, X } from "lucide-react"
import { useState } from "react"

interface Alert {
  id: string
  type: "negative" | "positive" | "neutral"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  time: string
  source: string
  mentions: number
  recommendation: string
  status: "active" | "resolved" | "dismissed"
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "negative",
    priority: "high",
    title: "Negative sentiment spike detected",
    description:
      "Customer service complaints increased by 45% in the last 2 hours. Multiple users reporting long wait times and unresolved issues.",
    time: "2 hours ago",
    source: "Twitter, Reddit",
    mentions: 127,
    recommendation:
      "Immediately review customer support queue and deploy additional agents. Consider posting a public acknowledgment.",
    status: "active",
  },
  {
    id: "2",
    type: "positive",
    priority: "medium",
    title: "Product launch trending positively",
    description:
      "New feature announcement gaining traction with 78% positive sentiment. Users praising innovation and ease of use.",
    time: "4 hours ago",
    source: "Twitter, LinkedIn",
    mentions: 234,
    recommendation:
      "Amplify positive mentions with targeted social media campaign. Consider reaching out to top advocates for testimonials.",
    status: "active",
  },
  {
    id: "3",
    type: "neutral",
    priority: "medium",
    title: "Competitor mention increase",
    description: "Competitor XYZ mentioned 23% more than usual. Users comparing features and pricing.",
    time: "6 hours ago",
    source: "Twitter, Forums",
    mentions: 89,
    recommendation:
      "Monitor competitor activity closely. Prepare competitive analysis and highlight your unique value propositions.",
    status: "active",
  },
  {
    id: "4",
    type: "negative",
    priority: "high",
    title: "Service outage impact",
    description: "Brief service interruption led to frustrated user posts. Sentiment dropped 15% during the incident.",
    time: "1 day ago",
    source: "Twitter, Support",
    mentions: 156,
    recommendation:
      "Post transparent communication about the incident and prevention measures. Follow up with affected users.",
    status: "resolved",
  },
]

export function AlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all")

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    return alert.status === filter
  })

  const handleResolve = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  const handleDismiss = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "dismissed" } : alert)))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "negative":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "positive":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      default:
        return <Users className="h-5 w-5 text-yellow-500" />
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display">Alerts Feed</CardTitle>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button variant={filter === "active" ? "default" : "outline"} size="sm" onClick={() => setFilter("active")}>
              Active
            </Button>
            <Button
              variant={filter === "resolved" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("resolved")}
            >
              Resolved
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              alert.status === "active"
                ? "border-border hover:glow-border"
                : alert.status === "resolved"
                  ? "border-green-500/20 bg-green-500/5"
                  : "border-muted bg-muted/20 opacity-60"
            }`}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>

              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium font-display">{alert.title}</h4>
                      <Badge variant={getPriorityColor(alert.priority)} className="text-xs">
                        {alert.priority}
                      </Badge>
                      {alert.status === "resolved" && (
                        <Badge variant="outline" className="text-xs text-green-500 border-green-500">
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{alert.time}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {alert.mentions} mentions
                      </span>
                      <span>Source: {alert.source}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{alert.description}</p>

                <div className="bg-secondary/50 p-3 rounded-lg">
                  <h5 className="text-xs font-medium text-primary mb-1">AI Recommendation:</h5>
                  <p className="text-xs text-muted-foreground">{alert.recommendation}</p>
                </div>

                {alert.status === "active" && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleResolve(alert.id)} className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Mark Resolved
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDismiss(alert.id)}
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Dismiss
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
