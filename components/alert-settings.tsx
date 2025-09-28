"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Mail, MessageSquare, Slack } from "lucide-react"
import { useState } from "react"

export function AlertSettings() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    slackAlerts: false,
    whatsappAlerts: true,
    sentimentThreshold: [30],
    volumeThreshold: [100],
    immediateAlerts: true,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Alert Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Channels */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Notification Channels</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Email Alerts</span>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, emailAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Slack className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Slack Integration</span>
                <Badge variant="outline" className="text-xs">
                  Pro
                </Badge>
              </div>
              <Switch
                checked={settings.slackAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, slackAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">WhatsApp</span>
                <Badge variant="outline" className="text-xs">
                  Pro
                </Badge>
              </div>
              <Switch
                checked={settings.whatsappAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, whatsappAlerts: checked })}
              />
            </div>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Alert Thresholds</h4>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Negative Sentiment Threshold</span>
                <span className="text-sm font-medium">{settings.sentimentThreshold[0]}%</span>
              </div>
              <Slider
                value={settings.sentimentThreshold}
                onValueChange={(value) => setSettings({ ...settings, sentimentThreshold: value })}
                max={50}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Alert when negative sentiment exceeds this percentage
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Mention Volume Spike</span>
                <span className="text-sm font-medium">{settings.volumeThreshold[0]}%</span>
              </div>
              <Slider
                value={settings.volumeThreshold}
                onValueChange={(value) => setSettings({ ...settings, volumeThreshold: value })}
                max={200}
                min={50}
                step={25}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Alert when mention volume increases by this percentage
              </p>
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Quick Settings</h4>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm">Immediate High-Priority Alerts</span>
              <p className="text-xs text-muted-foreground">Get notified instantly for critical issues</p>
            </div>
            <Switch
              checked={settings.immediateAlerts}
              onCheckedChange={(checked) => setSettings({ ...settings, immediateAlerts: checked })}
            />
          </div>
        </div>

        <Button className="w-full">Save Settings</Button>
      </CardContent>
    </Card>
  )
}
