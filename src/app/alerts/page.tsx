"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/common/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { AlertCard } from "@/components/ui/MetricCard"
import { mockAlerts } from "@/data/mock"
import { formatDate } from "@/utils/formatting"
import { Filter, CheckCircle } from "lucide-react"

type FilterType = "all" | "open" | "acknowledged" | "resolved"
type SeverityType = "all" | "critical" | "warning" | "info"

export default function AlertsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterType>("all")
  const [filterSeverity, setFilterSeverity] = useState<SeverityType>("all")

  const filtered = mockAlerts
    .filter((alert) => {
      const statusMatch = filterStatus === "all" || alert.status === filterStatus
      const severityMatch = filterSeverity === "all" || alert.severity === filterSeverity
      return statusMatch && severityMatch
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const stats = {
    total: mockAlerts.length,
    critical: mockAlerts.filter((a) => a.severity === "critical").length,
    warning: mockAlerts.filter((a) => a.severity === "warning").length,
    open: mockAlerts.filter((a) => a.status === "open").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alert Center</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage system alerts</p>
          </div>
          {stats.open > 0 && (
            <Badge status="critical" label={`${stats.open} Open Alerts`} />
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm mb-1">Total Alerts</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm mb-1">Critical</p>
              <p className="text-2xl font-bold text-danger">{stats.critical}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm mb-1">Warning</p>
              <p className="text-2xl font-bold text-warning">{stats.warning}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm mb-1">Open</p>
              <p className="text-2xl font-bold text-info">{stats.open}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterType)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value as SeverityType)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Alerts ({filtered.length} of {mockAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4 opacity-50" />
                <p className="text-foreground font-medium">No alerts found</p>
                <p className="text-muted-foreground text-sm">All systems operating normally</p>
              </div>
            ) : (
              filtered.map((alert) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type.replace(/_/g, " ").toUpperCase()}
                  severity={alert.severity}
                  message={alert.message}
                  timestamp={formatDate(alert.createdAt)}
                  onAcknowledge={() => undefined}
                  onDismiss={() => undefined}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
