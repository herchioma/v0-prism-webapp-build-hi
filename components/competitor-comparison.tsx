"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, TrendingDown } from "lucide-react"

const competitorData = [
  {
    name: "Your Brand",
    mentions: 2847,
    sentiment: 72,
    change: "+8.2%",
    changeType: "positive" as const,
  },
  {
    name: "Competitor A",
    mentions: 1923,
    sentiment: 64,
    change: "-2.1%",
    changeType: "negative" as const,
  },
  {
    name: "Competitor B",
    mentions: 1456,
    sentiment: 58,
    change: "+1.4%",
    changeType: "positive" as const,
  },
  {
    name: "Competitor C",
    mentions: 987,
    sentiment: 61,
    change: "-0.8%",
    changeType: "negative" as const,
  },
]

export function CompetitorComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Users className="h-5 w-5" />
          Competitor Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">Compare sentiment and mention volume with competitors</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Mention Volume Chart */}
          <div>
            <h4 className="font-medium mb-4">Mention Volume (Last 7 Days)</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: "currentColor" }} />
                  <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--card-foreground))",
                    }}
                  />
                  <Bar dataKey="mentions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Competitor Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {competitorData.map((competitor, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  competitor.name === "Your Brand"
                    ? "border-primary bg-primary/5 glow-border"
                    : "border-border hover:border-primary/50"
                } transition-all duration-200`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium font-display">{competitor.name}</h5>
                    {competitor.name === "Your Brand" && (
                      <Badge variant="default" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mentions</span>
                      <span className="font-medium">{competitor.mentions.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sentiment</span>
                      <span
                        className={`font-medium ${
                          competitor.sentiment >= 70
                            ? "text-green-500"
                            : competitor.sentiment >= 40
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {competitor.sentiment}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Change</span>
                      <div
                        className={`flex items-center gap-1 font-medium ${
                          competitor.changeType === "positive" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {competitor.changeType === "positive" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {competitor.change}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
