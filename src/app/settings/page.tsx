"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/common/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Save, Copy } from "lucide-react"

export default function SettingsPage() {
  const [tab, setTab] = useState("organization")

  const tabs = [
    { id: "organization", label: "Organization" },
    { id: "notifications", label: "Notifications" },
    { id: "ocpp", label: "OCPP Configuration" },
    { id: "api", label: "API Keys" },
    { id: "security", label: "Security" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your platform configuration</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <Card className="p-0 border-0">
              <nav className="space-y-1">
                {tabs.map((tab_item) => (
                  <button
                    key={tab_item.id}
                    onClick={() => setTab(tab_item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                      tab === tab_item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {tab_item.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Organization Settings */}
            {tab === "organization" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Information</CardTitle>
                    <CardDescription>
                      Update your organization details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Organization Name
                      </label>
                      <Input placeholder="ChargeVision Inc." defaultValue="ChargeVision Inc." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input placeholder="contact@chargevision.com" defaultValue="contact@chargevision.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <Input placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Website
                      </label>
                      <Input placeholder="https://chargevision.com" defaultValue="https://chargevision.com" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {/* Notification Settings */}
            {tab === "notifications" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how you receive alerts and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">Critical Alerts</p>
                        <p className="text-sm text-muted-foreground">Charger offline, fault detected</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">Warning Alerts</p>
                        <p className="text-sm text-muted-foreground">Over temperature, high usage</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">Daily Reports</p>
                        <p className="text-sm text-muted-foreground">Daily energy and revenue summary</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Send to admin email address</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {/* OCPP Configuration */}
            {tab === "ocpp" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>OCPP Configuration</CardTitle>
                    <CardDescription>
                      Configure Open Charge Point Protocol settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        OCPP Server URL
                      </label>
                      <Input
                        placeholder="wss://ocpp.chargevision.com"
                        defaultValue="wss://ocpp.chargevision.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Central System ID
                      </label>
                      <Input
                        placeholder="chargevision-cs-1"
                        defaultValue="chargevision-cs-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        OCPP Version
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground">
                        <option>1.6J</option>
                        <option>2.0</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Update Configuration
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {/* API Keys */}
            {tab === "api" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage your API credentials for integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm font-medium text-foreground mb-2">Production Key</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs bg-background px-3 py-2 rounded-lg text-muted-foreground overflow-hidden text-ellipsis">
                          
                        </code>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm font-medium text-foreground mb-2">Development Key</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs bg-background px-3 py-2 rounded-lg text-muted-foreground overflow-hidden text-ellipsis">
                          sk_test_51IJ2P1K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F
                        </code>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Generate New Key</Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {/* Security Settings */}
            {tab === "security" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage security and access controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">IP Whitelist</p>
                        <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-medium text-foreground">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Auto logout after 30 minutes</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>
                      View recent security and access logs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">View Audit Logs</Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
