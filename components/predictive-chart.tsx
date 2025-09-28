"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Calendar, Brain, TrendingUp } from "lucide-react"

const historicalData = [
  { date: "Jan 1", actual: 65, predicted: null },
  { date: "Jan 2", actual: 70, predicted: null },
  { date: "Jan 3", actual: 68, predicted: null },
  { date: "Jan 4", actual: 72, predicted: null },
  { date: "Jan 5", actual: 75, predicted: null },
  { date: "Jan 6", actual: 73, predicted: null },
  { date: "Jan 7", actual: 78, predicted: null },
]

const forecastData = [
  { date: "Jan 7", actual: 78, predicted: 78 },
  { date: "Jan 8", actual: null, predicted: 80 },
  { date: "Jan 9", actual: null, predicted: 82 },
  { date: "Jan 10", actual: null, predicted: 79 },
  { date: "Jan 11", actual: null, predicted: 85 },
  { date: "Jan 12", actual: null, predicted: 87 },
  { date: "Jan 13", actual: null, predicted: 84 },
  { date: "Jan 14", actual: null, predicted: 89 },
]

const combinedData = [...historicalData, ...forecastData.slice(1)]

export function PredictiveChart() {
  return (
    <Card className="glow-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Sentiment Forecast
          </CardTitle>
          <p className="text-sm text-muted-foreground">AI-powered 7-day sentiment prediction</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            87% Accuracy
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />7 Days
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00b5d8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00b5d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-xs" tick={{ fill: "currentColor" }} />
              <YAxis domain={[50, 100]} className="text-xs" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value, name) => [`${value}%`, name === "actual" ? "Historical" : "Predicted"]}
              />
              <ReferenceLine x="Jan 7" stroke="hsl(var(--border))" strokeDasharray="2 2" />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#00b5d8"
                strokeWidth={3}
                dot={{ fill: "#00b5d8", strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#8b5cf6"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00b5d8]" />
            <span>Historical Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
            <span>AI Prediction</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-primary">AI Analysis:</strong> Based on current trends and historical patterns,
            sentiment is expected to improve by 12% over the next 7 days. Key factors include positive product feedback
            and reduced service complaints.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
