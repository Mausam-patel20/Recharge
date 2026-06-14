"use client"

import { DashboardLayout } from "@/components/common/DashboardLayout"
import { MetricCard, AlertCard } from "@/components/ui/MetricCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  mockDashboardMetrics,
  mockAlerts,
  mockEnergyAnalytics,
  mockRevenueAnalytics,
  mockSessions,
} from "@/data/mock"
import { formatCurrency, formatEnergy, formatDate } from "@/utils/formatting"
import {
  Zap,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const metrics = mockDashboardMetrics
  const alerts = mockAlerts.slice(0, 3)
  const activeSessions = mockSessions.filter((s) => s.status === "active")

  const chartColors = {
    available: "#10B981",
    charging: "#3B82F6",
    faulted: "#EF4444",
    offline: "#808080",
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your charging network overview.</p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            label="Total Chargers"
            value={metrics.totalChargers}
            icon={<Zap />}
            trend={{ value: 5, direction: "up" }}
          />
          <MetricCard
            label="Online"
            value={metrics.onlineChargers}
            icon={<CheckCircle />}
            trend={{ value: 2, direction: "up" }}
          />
          <MetricCard
            label="Offline"
            value={metrics.offlineChargers}
            icon={<AlertCircle />}
            trend={{ value: 1, direction: "down" }}
          />
          <MetricCard
            label="Active Sessions"
            value={metrics.activeSessions}
            icon={<Activity />}
            trend={{ value: 12, direction: "up" }}
          />
          <MetricCard
            label="Revenue Today"
            value={formatCurrency(metrics.revenueToday)}
            icon={<TrendingUp />}
            trend={{ value: 8, direction: "up" }}
          />
          <MetricCard
            label="Energy Delivered"
            value={formatEnergy(metrics.energyDeliveredToday)}
            icon={<Zap />}
            trend={{ value: 3, direction: "up" }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Charger Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Charger Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Available", value: metrics.chargerStatusDistribution.available },
                      { name: "Charging", value: metrics.chargerStatusDistribution.charging },
                      { name: "Faulted", value: metrics.chargerStatusDistribution.faulted },
                      { name: "Offline", value: metrics.chargerStatusDistribution.offline },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill={chartColors.available} />
                    <Cell fill={chartColors.charging} />
                    <Cell fill={chartColors.faulted} />
                    <Cell fill={chartColors.offline} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Energy Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Usage (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={mockEnergyAnalytics}>
                  <defs>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="energyDelivered"
                    stroke="#007AFF"
                    fillOpacity={1}
                    fill="url(#colorEnergy)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockRevenueAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#007AFF"
                    dot={{ fill: "#007AFF", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Active Sessions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Alerts</CardTitle>
                <Badge status="warning" label="2 Critical" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type.replace(/_/g, " ").toUpperCase()}
                  severity={alert.severity}
                  message={alert.message}
                  timestamp={formatDate(alert.createdAt)}
                  onAcknowledge={() => console.log("Acknowledge:", alert.id)}
                  onDismiss={() => console.log("Dismiss:", alert.id)}
                />
              ))}
              <button className="w-full py-2 text-center text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                View All Alerts
              </button>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Active Charging Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Charger {session.chargerId} - Connector {session.connectorId}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatEnergy(session.energyDelivered)} • {formatCurrency(session.cost)}
                      </p>
                    </div>
                    <Badge status="charging" label="Charging" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
