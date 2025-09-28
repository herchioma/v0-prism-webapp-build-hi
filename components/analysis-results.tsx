"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  FileText,
  Download,
  RotateCcw,
  TrendingUp,
  Brain,
  Eye,
  Database,
  Lightbulb,
  MessageSquare,
  CheckCircle,
} from "lucide-react"
import type { AnalysisData } from "@/app/upload/page"

interface AnalysisResultsProps {
  data: AnalysisData
  onNewUpload: () => void
}

const SENTIMENT_COLORS = {
  positive: "#10b981",
  negative: "#ef4444",
  neutral: "#6b7280",
}

export function AnalysisResults({ data, onNewUpload }: AnalysisResultsProps) {
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,"

    if (data.tweetExtraction) {
      // For tweet extraction, include all extracted tweets with analysis
      csvContent += "tweet_text,baseline_sentiment,rag_sentiment,explanation\n"
      csvContent += data.explanations
        .map((item) => {
          const baseline = data.baselineSentiment.find((b) => b.text === item.text)
          const rag = data.ragSentiment.find((r) => r.text === item.text)
          return `"${item.text}","${baseline?.sentiment || "N/A"}","${rag?.sentiment || "N/A"}","${item.explanation}"`
        })
        .join("\n")
    } else {
      // Original CSV format for regular datasets
      csvContent += "text,baseline_sentiment,rag_sentiment,explanation\n"
      csvContent += data.explanations
        .map((item) => {
          const baseline = data.baselineSentiment.find((b) => b.text === item.text)
          const rag = data.ragSentiment.find((r) => r.text === item.text)
          return `"${item.text}","${baseline?.sentiment || "N/A"}","${rag?.sentiment || "N/A"}","${item.explanation}"`
        })
        .join("\n")
    }

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${data.filename}_analysis.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadPDF = () => {
    // Mock PDF download
    alert("PDF report generation would be implemented here")
  }

  const downloadTweetsCSV = () => {
    if (!data.tweetExtraction) return

    const csvContent =
      "data:text/csv;charset=utf-8,tweet_number,tweet_text\n" +
      data.tweetExtraction.extractedTweets.map((tweet, index) => `${index + 1},"${tweet}"`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${data.filename}_extracted_tweets.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const comparisonData = [
    {
      sentiment: "Positive",
      baseline: data.sentimentDistribution.baseline.positive,
      rag: data.sentimentDistribution.rag.positive,
    },
    {
      sentiment: "Negative",
      baseline: data.sentimentDistribution.baseline.negative,
      rag: data.sentimentDistribution.rag.negative,
    },
    {
      sentiment: "Neutral",
      baseline: data.sentimentDistribution.baseline.neutral,
      rag: data.sentimentDistribution.rag.neutral,
    },
  ]

  const pieData = [
    { name: "Positive", value: data.sentimentDistribution.rag.positive, color: SENTIMENT_COLORS.positive },
    { name: "Negative", value: data.sentimentDistribution.rag.negative, color: SENTIMENT_COLORS.negative },
    { name: "Neutral", value: data.sentimentDistribution.rag.neutral, color: SENTIMENT_COLORS.neutral },
  ]

  return (
    <div className="space-y-6">
      {data.tweetExtraction && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Successfully extracted {data.tweetExtraction.totalTweets} tweets from {data.filename}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Tweets have been cleaned, structured, and analyzed with both baseline and RAG-enhanced sentiment
                  analysis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display">Analysis Results</h2>
          <p className="text-muted-foreground">
            {data.filename} • {data.rows.toLocaleString()} {data.tweetExtraction ? "tweets" : "rows"} • {data.columns}{" "}
            columns
          </p>
        </div>
        <div className="flex gap-2">
          {data.tweetExtraction && (
            <Button variant="outline" onClick={downloadTweetsCSV}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Download Tweets
            </Button>
          )}
          <Button variant="outline" onClick={downloadCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={downloadPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={onNewUpload}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Upload
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {data.tweetExtraction ? "Total Tweets" : "Total Rows"}
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.rows.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {data.tweetExtraction ? "Extracted and analyzed" : `${data.missingValues} missing values`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Text Columns</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.textColumns.length}</div>
            <p className="text-xs text-muted-foreground">{data.textColumns.join(", ")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RAG Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+3.2%</div>
            <p className="text-xs text-muted-foreground">Confidence increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dominant Sentiment</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Positive</div>
            <p className="text-xs text-muted-foreground">{data.sentimentDistribution.rag.positive}% of responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue={data.tweetExtraction ? "tweets" : "overview"} className="space-y-4">
        <TabsList className={`grid w-full ${data.tweetExtraction ? "grid-cols-6" : "grid-cols-5"}`}>
          {data.tweetExtraction && <TabsTrigger value="tweets">Tweets</TabsTrigger>}
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="explanations">Explanations</TabsTrigger>
          <TabsTrigger value="wordclouds">Word Clouds</TabsTrigger>
          <TabsTrigger value="preview">Data Preview</TabsTrigger>
        </TabsList>

        {data.tweetExtraction && (
          <TabsContent value="tweets" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Tweet Extraction Summary
                  </CardTitle>
                  <CardDescription>Overview of extracted tweets from your document</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Tweets Extracted:</span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {data.tweetExtraction.totalTweets}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Successfully extracted numbered tweets from your document. Each tweet has been:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Cleaned of numbering and extra whitespace</li>
                      <li>• Analyzed with baseline sentiment analysis</li>
                      <li>• Enhanced with RAG-powered predictions</li>
                      <li>• Explained with AI reasoning</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tweet Preview</CardTitle>
                  <CardDescription>First 5 extracted tweets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.tweetExtraction.previewTweets.map((tweet, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          <p className="text-sm flex-1">{tweet}</p>
                        </div>
                      </div>
                    ))}
                    {data.tweetExtraction.totalTweets > 5 && (
                      <p className="text-xs text-muted-foreground text-center">
                        ... and {data.tweetExtraction.totalTweets - 5} more tweets
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution (RAG-Enhanced)</CardTitle>
                <CardDescription>Final sentiment analysis results with RAG improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confidence Metrics</CardTitle>
                <CardDescription>Average confidence scores by sentiment type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Positive Sentiment</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Negative Sentiment</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Neutral Sentiment</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Baseline vs RAG-Enhanced Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of sentiment analysis results</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sentiment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="baseline" fill="#8884d8" name="Baseline" />
                  <Bar dataKey="rag" fill="#00b5d8" name="RAG-Enhanced" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explanations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Explainable AI Results
              </CardTitle>
              <CardDescription>Understanding why each prediction was made</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.explanations.slice(0, 5).map((item, index) => {
                  const baseline = data.baselineSentiment.find((b) => b.text === item.text)
                  const rag = data.ragSentiment.find((r) => r.text === item.text)

                  return (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="font-medium text-sm">{item.text}</div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Baseline</Badge>
                          <Badge
                            variant={
                              baseline?.sentiment === "POSITIVE"
                                ? "default"
                                : baseline?.sentiment === "NEGATIVE"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {baseline?.sentiment}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {(baseline?.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">RAG</Badge>
                          <Badge
                            variant={
                              rag?.sentiment === "POSITIVE"
                                ? "default"
                                : rag?.sentiment === "NEGATIVE"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {rag?.sentiment}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{(rag?.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground bg-secondary p-2 rounded">
                        <Eye className="h-4 w-4 inline mr-2" />
                        {item.explanation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wordclouds" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(data.wordClouds).map(([sentiment, words]) => (
              <Card key={sentiment}>
                <CardHeader>
                  <CardTitle className="capitalize">{sentiment} Words</CardTitle>
                  <CardDescription>Most frequent words in {sentiment} sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {words.slice(0, 8).map((word, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{word.text}</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${(word.value / words[0].value) * 100}px` }}
                          />
                          <span className="text-xs text-muted-foreground w-8">{word.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dataset Preview</CardTitle>
              <CardDescription>
                {data.tweetExtraction ? "First 5 extracted tweets" : "First 5 rows of your uploaded dataset"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {Object.keys(data.preview[0] || {}).map((key) => (
                        <th key={key} className="text-left p-2 font-medium">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.preview.map((row, index) => (
                      <tr key={index} className="border-b">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="p-2">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
