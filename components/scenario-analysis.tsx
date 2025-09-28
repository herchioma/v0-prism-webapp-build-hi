"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Zap, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useState } from "react"

const scenarios = [
  {
    name: "Best Case",
    sentiment: 89,
    probability: "25%",
    description: "Viral positive content + excellent service response",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    name: "Most Likely",
    sentiment: 82,
    probability: "50%",
    description: "Continued positive trend with minor service issues",
    icon: Minus,
    color: "text-blue-500",
  },
  {
    name: "Worst Case",
    sentiment: 68,
    probability: "25%",
    description: "Service capacity overwhelmed + competitor gains",
    icon: TrendingDown,
    color: "text-red-500",
  },
]

export function ScenarioAnalysis() {
  const [selectedScenario, setSelectedScenario] = useState("Most Likely")

  const scenarioDetails = {
    "Best Case": {
      factors: ["Viral content amplification", "Perfect service delivery", "Competitor missteps"],
      actions: ["Maximize content promotion", "Ensure service excellence", "Capitalize on opportunities"],
      timeline: "3-5 days to achieve",
    },
    "Most Likely": {
      factors: ["Steady positive growth", "Minor service hiccups", "Normal market conditions"],
      actions: ["Maintain current strategy", "Monitor service metrics", "Prepare for scale"],
      timeline: "7 days gradual improvement",
    },
    "Worst Case": {
      factors: ["Service capacity issues", "Competitor aggressive moves", "Market sentiment shift"],
      actions: ["Emergency service scaling", "Crisis communication", "Defensive positioning"],
      timeline: "Immediate action required",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Scenario Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">Explore different outcome possibilities</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scenarios}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "currentColor" }} />
              <YAxis domain={[60, 100]} className="text-xs" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value) => [`${value}%`, "Sentiment"]}
              />
              <Bar dataKey="sentiment" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario Buttons */}
        <div className="flex gap-2">
          {scenarios.map((scenario) => (
            <Button
              key={scenario.name}
              variant={selectedScenario === scenario.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedScenario(scenario.name)}
              className="flex items-center gap-1"
            >
              <scenario.icon className="h-3 w-3" />
              {scenario.name}
            </Button>
          ))}
        </div>

        {/* Selected Scenario Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{selectedScenario} Scenario</h4>
            <Badge variant="secondary">
              {scenarios.find((s) => s.name === selectedScenario)?.probability} probability
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            {scenarios.find((s) => s.name === selectedScenario)?.description}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h5 className="text-xs font-medium">Key Factors:</h5>
              <div className="space-y-1">
                {scenarioDetails[selectedScenario as keyof typeof scenarioDetails].factors.map((factor, index) => (
                  <div key={index} className="text-xs p-2 bg-secondary/50 rounded">
                    • {factor}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-medium">Recommended Actions:</h5>
              <div className="space-y-1">
                {scenarioDetails[selectedScenario as keyof typeof scenarioDetails].actions.map((action, index) => (
                  <div key={index} className="text-xs p-2 bg-primary/5 rounded">
                    • {action}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-secondary/50 rounded-lg">
            <div className="text-xs font-medium text-primary mb-1">Timeline:</div>
            <div className="text-xs text-muted-foreground">
              {scenarioDetails[selectedScenario as keyof typeof scenarioDetails].timeline}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
