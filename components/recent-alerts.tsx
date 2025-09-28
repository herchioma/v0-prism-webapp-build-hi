import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Clock } from "lucide-react"

export function RecentAlerts() {
  const alerts = [
    {
      id: 1,
      type: "negative" as const,
      title: "Negative sentiment spike detected",
      description: "Customer service complaints increased by 45% in the last 2 hours",
      time: "2 hours ago",
      action: "Review customer support tickets and respond promptly",
    },
    {
      id: 2,
      type: "positive" as const,
      title: "Positive trend opportunity",
      description: "Product launch mentions trending with 78% positive sentiment",
      time: "4 hours ago",
      action: "Amplify positive mentions with targeted social media campaign",
    },
    {
      id: 3,
      type: "neutral" as const,
      title: "Competitor mention increase",
      description: "Competitor XYZ mentioned 23% more than usual",
      time: "6 hours ago",
      action: "Monitor competitor activity and prepare response strategy",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="flex-shrink-0">
              {alert.type === "negative" && (
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
              )}
              {alert.type === "positive" && (
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              )}
              {alert.type === "neutral" && (
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium font-display">{alert.title}</h4>
                <Badge
                  variant={
                    alert.type === "negative" ? "destructive" : alert.type === "positive" ? "default" : "secondary"
                  }
                >
                  {alert.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <p className="text-xs text-primary font-medium">{alert.action}</p>
              <p className="text-xs text-muted-foreground">{alert.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
