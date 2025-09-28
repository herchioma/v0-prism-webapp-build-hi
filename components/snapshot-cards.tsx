import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Hash, AlertTriangle } from "lucide-react"

export function SnapshotCards() {
  const snapshots = [
    {
      title: "Trending Keywords",
      value: "#innovation, #quality, #service",
      change: "+12%",
      changeType: "positive" as const,
      icon: Hash,
    },
    {
      title: "Mention Volume",
      value: "2,847",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Latest Alert",
      value: "Negative spike detected",
      change: "2 hours ago",
      changeType: "negative" as const,
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {snapshots.map((snapshot, index) => (
        <Card key={index} className="hover:glow-border transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{snapshot.title}</CardTitle>
            <snapshot.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold font-display text-balance">{snapshot.value}</div>
            <p
              className={`text-xs ${
                snapshot.changeType === "positive"
                  ? "text-green-500"
                  : snapshot.changeType === "negative"
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {snapshot.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
