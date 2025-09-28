"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Calendar } from "lucide-react"

export function BillingSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Billing & Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium">Professional Plan</h4>
              <p className="text-sm text-muted-foreground">Advanced sentiment analysis with AI forecasting</p>
            </div>
            <Badge variant="default">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold font-display">
              $99<span className="text-sm font-normal">/month</span>
            </div>
            <Button variant="outline" size="sm">
              Manage Plan
            </Button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded border border-border">
            <div className="text-lg font-bold font-display">2,847</div>
            <div className="text-xs text-muted-foreground">Mentions This Month</div>
            <div className="text-xs text-green-500">28% of limit</div>
          </div>
          <div className="text-center p-3 rounded border border-border">
            <div className="text-lg font-bold font-display">15</div>
            <div className="text-xs text-muted-foreground">Reports Generated</div>
            <div className="text-xs text-green-500">Unlimited</div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Payment Method</h4>
          <div className="p-3 rounded border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div>
                  <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                  <div className="text-xs text-muted-foreground">Expires 12/25</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Update
              </Button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Invoices</h4>
          <div className="space-y-2">
            {[
              { date: "Jan 15, 2024", amount: "$99.00", status: "Paid" },
              { date: "Dec 15, 2023", amount: "$99.00", status: "Paid" },
              { date: "Nov 15, 2023", amount: "$99.00", status: "Paid" },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded border border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{invoice.date}</div>
                    <div className="text-xs text-muted-foreground">{invoice.amount}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
