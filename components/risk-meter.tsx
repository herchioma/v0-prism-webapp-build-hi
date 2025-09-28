"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Info } from "lucide-react"

export function RiskMeter() {
  const riskLevel = 45 // 0-100 scale
  const riskCategory = riskLevel >= 70 ? "High" : riskLevel >= 40 ? "Medium" : "Low"
  const riskColor = riskLevel >= 70 ? "text-red-500" : riskLevel >= 40 ? "text-yellow-500" : "text-green-500"
  const riskBgColor = riskLevel >= 70 ? "bg-red-500" : riskLevel >= 40 ? "bg-yellow-500" : "bg-green-500"

  const riskFactors = [
    {
      factor: "Service Complaints",
      impact: "Medium",
      trend: "Increasing",
      color: "text-yellow-500",
    },
    {
      factor: "Competitor Activity",
      impact: "Low",
      trend: "Stable",
      color: "text-green-500",
    },
    {
      factor: "Market Sentiment",
      impact: "High",
      trend: "Positive",
      color: "text-green-500",
    },
    {
      factor: "Volume Volatility",
      impact: "Medium",
      trend: "Decreasing",
      color: "text-green-500",
    },
  ]

  return (
    <Card className="glow-border">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Risk Assessment
        </CardTitle>
        <p className="text-sm text-muted-foreground">AI-powered risk analysis for next 7 days</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Gauge */}
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted opacity-20"
              />
              {/* Risk level arc */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(riskLevel / 100) * 314} 314`}
                className={`${riskColor} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold font-display">{riskLevel}%</div>
                <div className={`text-sm font-medium ${riskColor}`}>{riskCategory}</div>
              </div>
            </div>
          </div>

          <Badge variant="outline" className={`${riskColor} border-current`}>
            {riskCategory} Risk Level
          </Badge>
        </div>

        {/* Risk Factors */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Info className="h-4 w-4" />
            Risk Factors
          </h4>

          {riskFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded border border-border">
              <div className="space-y-1">
                <div className="text-sm font-medium">{factor.factor}</div>
                <div className="text-xs text-muted-foreground">Impact: {factor.impact}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${factor.color}`}>{factor.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Summary */}
        <div className="p-3 bg-secondary/50 rounded-lg">
          <h5 className="text-xs font-medium text-primary mb-2">Risk Summary:</h5>
          <p className="text-xs text-muted-foreground">
            Current risk level is <strong className={riskColor}>{riskCategory.toLowerCase()}</strong> due to moderate
            service complaint trends. Monitor customer support metrics closely and prepare response strategies for
            potential escalation.
          </p>
        </div>

        {/* Mitigation Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            Recommended Actions
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
              • Increase customer support capacity during peak hours
            </div>
            <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
              • Prepare proactive communication templates
            </div>
            <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
              • Monitor competitor activities for market shifts
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
