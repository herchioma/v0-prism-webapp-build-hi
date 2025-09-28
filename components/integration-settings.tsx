"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Link2, Twitter, MessageSquare, Mail, Slack, CheckCircle, AlertCircle } from "lucide-react"

const integrations = [
  {
    id: "twitter",
    name: "Twitter/X",
    description: "Connect your Twitter account for sentiment monitoring",
    icon: Twitter,
    status: "connected",
    enabled: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send alerts and reports to Slack channels",
    icon: Slack,
    status: "connected",
    enabled: false,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Receive critical alerts via WhatsApp",
    icon: MessageSquare,
    status: "disconnected",
    enabled: false,
  },
  {
    id: "email",
    name: "Email Integration",
    description: "Advanced email notification settings",
    icon: Mail,
    status: "connected",
    enabled: true,
  },
]

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Integrations
        </CardTitle>
        <p className="text-sm text-muted-foreground">Connect external services and platforms</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="p-4 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <integration.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{integration.name}</h4>
                    <p className="text-xs text-muted-foreground">{integration.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.status === "connected" ? (
                      <Badge variant="default" className="text-xs flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Disconnected
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch checked={integration.enabled} disabled={integration.status === "disconnected"} />
                    <span className="text-xs text-muted-foreground">
                      {integration.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {integration.status === "connected" ? (
                      <>
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-red-500">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="text-xs">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
