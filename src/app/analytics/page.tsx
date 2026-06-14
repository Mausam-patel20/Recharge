"use client"

import { DashboardLayout } from "@/components/common/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import {
  mockEnergyAnalytics,
  mockRevenueAnalytics,
  mockChargerUtilization,
} from "@/data/mock"
import { formatEnergy, formatCurrency, formatPercentage } from "@/utils/formatting"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Energy Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Delivered (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockEnergyAnalytics}>
                  <defs>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="energyDelivered"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorEnergy)"
                    name="Energy (kWh)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Metrics Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Total Energy</span>
                <span className="font-bold text-foreground">
                  {formatEnergy(
                    mockEnergyAnalytics.reduce((sum, d) => sum + d.energyDelivered, 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Daily Average</span>
                <span className="font-bold text-foreground">
                  {formatEnergy(
                    mockEnergyAnalytics.reduce((sum, d) => sum + d.energyDelivered, 0) /
                      mockEnergyAnalytics.length
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Peak Usage</span>
                <span className="font-bold text-foreground">
                  {formatPower(
                    Math.max(...mockEnergyAnalytics.map((d) => d.peakUsage))
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Avg Session Length</span>
                <span className="font-bold text-foreground">
                  {(
                    mockEnergyAnalytics.reduce((sum, d) => sum + d.averageSessionLength, 0) /
                    mockEnergyAnalytics.length
                  ).toFixed(0)}{" "}
                  min
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
                  name="Revenue ($)"
                />
                <Line
                  type="monotone"
                  dataKey="transactionsCount"
                  stroke="#10B981"
                  dot={{ fill: "#10B981", r: 4 }}
                  yAxisId="right"
                  name="Transactions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(
                    mockRevenueAnalytics.reduce((sum, d) => sum + d.revenue, 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Daily Average</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(
                    mockRevenueAnalytics.reduce((sum, d) => sum + d.revenue, 0) /
                      mockRevenueAnalytics.length
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-muted-foreground">Total Transactions</span>
                <span className="font-bold text-foreground">
                  {mockRevenueAnalytics.reduce(
                    (sum, d) => sum + d.transactionsCount,
                    0
                  )}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Charger Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Chargers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockChargerUtilization
                  .sort((a, b) => b.utilizationPercentage - a.utilizationPercentage)
                  .slice(0, 5)
                  .map((charger) => (
                    <div key={charger.chargerId} className="flex items-center justify-between p-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{charger.name}</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${charger.utilizationPercentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-foreground ml-4">
                        {formatPercentage(charger.utilizationPercentage)}
                      </span>
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

function formatPower(watts: number): string {
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(1)} kW`
  }
  return `${watts.toFixed(0)} W`
}
