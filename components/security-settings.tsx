"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Shield, Key, Smartphone } from "lucide-react"

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Change */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Key className="h-4 w-4" />
            Change Password
          </h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button size="sm">Update Password</Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Two-Factor Authentication
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Enable 2FA</div>
              <div className="text-xs text-muted-foreground">Add an extra layer of security to your account</div>
            </div>
            <Switch />
          </div>
        </div>

        {/* Session Management */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Active Sessions</h4>
          <div className="space-y-2">
            <div className="p-3 rounded border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Current Session</div>
                  <div className="text-xs text-muted-foreground">Chrome on Windows • Last active: Now</div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Current
                </Button>
              </div>
            </div>
            <div className="p-3 rounded border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Mobile App</div>
                  <div className="text-xs text-muted-foreground">iOS App • Last active: 2 hours ago</div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-red-500">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
