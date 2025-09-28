import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, MessageSquare, Hash, Clock } from "lucide-react"

export function TrendMetrics() {
  const metrics = [
    {
      title: "Total Mentions",
      value: "2,847",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: MessageSquare,
      description: "vs last week",
    },
    {
      title: "Unique Users",
      value: "1,923",
      change: "+12.4%",
      changeType: "positive" as const,
      icon: Users,
      description: "engaging with brand",
    },
    {
      title: "Trending Topics",
      value: "23",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: Hash,
      description: "active discussions",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-15.3%",
      changeType: "positive" as const,
      icon: Clock,
      description: "to address issues",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:glow-border transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{metric.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric.changeType === "positive" ? "text-green-500" : "text-red-500"
                }`}
              >
                {metric.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.change}
              </div>
              <span className="text-xs text-muted-foreground">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
