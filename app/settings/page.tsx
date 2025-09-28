import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileSettings } from "@/components/profile-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { IntegrationSettings } from "@/components/integration-settings"
import { SecuritySettings } from "@/components/security-settings"
import { BillingSettings } from "@/components/billing-settings"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-display text-balance">Settings</h1>
          <p className="text-muted-foreground text-pretty">
            Manage your account, notifications, integrations, and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <ProfileSettings />
            <SecuritySettings />
            <BillingSettings />
          </div>
          <div className="space-y-6">
            <NotificationSettings />
            <IntegrationSettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
