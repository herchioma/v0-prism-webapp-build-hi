import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react"

export function ForecastOverview() {
  const forecasts = [
    {
      title: "7-Day Sentiment Trend",
      value: "+12%",
      prediction: "Positive growth expected",
      confidence: "87%",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Risk Level",
      value: "Medium",
      prediction: "Potential service concerns",
      confidence: "73%",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Mention Volume",
      value: "-5%",
      prediction: "Slight decrease expected",
      confidence: "65%",
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Opportunity Score",
      value: "High",
      prediction: "Strong engagement potential",
      confidence: "91%",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {forecasts.map((forecast, index) => (
        <Card key={index} className="hover:glow-border transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{forecast.title}</CardTitle>
            <div className={`w-8 h-8 rounded-full ${forecast.bgColor} flex items-center justify-center`}>
              <forecast.icon className={`h-4 w-4 ${forecast.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{forecast.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{forecast.prediction}</p>
            <div className="flex items-center gap-1 mt-2">
              <div className="text-xs text-primary font-medium">Confidence: {forecast.confidence}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
