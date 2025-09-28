"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, TrendingUp } from "lucide-react"

const trendingWords = [
  { word: "innovation", count: 847, sentiment: "positive", size: "text-3xl" },
  { word: "quality", count: 623, sentiment: "positive", size: "text-2xl" },
  { word: "service", count: 445, sentiment: "neutral", size: "text-xl" },
  { word: "support", count: 334, sentiment: "negative", size: "text-lg" },
  { word: "price", count: 298, sentiment: "negative", size: "text-lg" },
  { word: "features", count: 267, sentiment: "positive", size: "text-base" },
  { word: "delivery", count: 234, sentiment: "neutral", size: "text-base" },
  { word: "experience", count: 198, sentiment: "positive", size: "text-base" },
  { word: "team", count: 156, sentiment: "positive", size: "text-sm" },
  { word: "product", count: 134, sentiment: "positive", size: "text-sm" },
  { word: "issues", count: 123, sentiment: "negative", size: "text-sm" },
  { word: "amazing", count: 98, sentiment: "positive", size: "text-sm" },
]

export function WordCloud() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500 hover:text-green-400"
      case "negative":
        return "text-red-500 hover:text-red-400"
      default:
        return "text-yellow-500 hover:text-yellow-400"
    }
  }

  return (
    <Card className="glow-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Trending Keywords
            </CardTitle>
            <p className="text-sm text-muted-foreground">Most mentioned words in the last 24 hours</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px] p-4">
          {trendingWords.map((item, index) => (
            <button
              key={index}
              className={`font-bold transition-all duration-200 hover:scale-110 cursor-pointer ${item.size} ${getSentimentColor(item.sentiment)}`}
              title={`${item.word}: ${item.count} mentions (${item.sentiment})`}
            >
              {item.word}
            </button>
          ))}
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-green-500">Positive</div>
              <div className="text-muted-foreground">2,156 mentions</div>
            </div>
            <div>
              <div className="font-semibold text-yellow-500">Neutral</div>
              <div className="text-muted-foreground">679 mentions</div>
            </div>
            <div>
              <div className="font-semibold text-red-500">Negative</div>
              <div className="text-muted-foreground">421 mentions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
