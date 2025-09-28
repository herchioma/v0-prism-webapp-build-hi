"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell } from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    marketingEmails: false,
    alertFrequency: "immediate",
    quietHours: "22:00-08:00",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Email Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Sentiment Alerts</div>
                <div className="text-xs text-muted-foreground">Get notified about significant sentiment changes</div>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Weekly Reports</div>
                <div className="text-xs text-muted-foreground">Receive weekly sentiment summary reports</div>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Marketing Updates</div>
                <div className="text-xs text-muted-foreground">Product updates and feature announcements</div>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
              />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Push Notifications</h4>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Browser Notifications</div>
              <div className="text-xs text-muted-foreground">Real-time alerts in your browser</div>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
            />
          </div>
        </div>

        {/* Alert Frequency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Alert Frequency</label>
          <Select
            value={notifications.alertFrequency}
            onValueChange={(value) => setNotifications({ ...notifications, alertFrequency: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="hourly">Hourly Digest</SelectItem>
              <SelectItem value="daily">Daily Summary</SelectItem>
              <SelectItem value="weekly">Weekly Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quiet Hours */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quiet Hours</label>
          <Select
            value={notifications.quietHours}
            onValueChange={(value) => setNotifications({ ...notifications, quietHours: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Quiet Hours</SelectItem>
              <SelectItem value="22:00-08:00">10 PM - 8 AM</SelectItem>
              <SelectItem value="20:00-09:00">8 PM - 9 AM</SelectItem>
              <SelectItem value="18:00-09:00">6 PM - 9 AM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
