"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/common/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { mockChargers } from "@/data/mock"
import { formatDate } from "@/utils/formatting"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit2,
  Power,
  Activity,
} from "lucide-react"

export default function ChargersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterStatus, setFilterStatus] = useState("all")

  const filtered = mockChargers
    .filter((charger) => {
      const matchesSearch =
        charger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charger.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || charger.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return 0
    })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chargers</h1>
            <p className="text-muted-foreground mt-1">Manage your charging network</p>
          </div>
          <Button>Add Charger</Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="flex-1 min-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chargers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="charging">Charging</option>
                <option value="faulted">Faulted</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
              </select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Charger Status ({filtered.length} of {mockChargers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Location
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Model
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Connectors
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Last Heartbeat
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((charger) => (
                    <tr key={charger.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground">{charger.name}</p>
                          <p className="text-xs text-muted-foreground">{charger.serialNumber}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {charger.locationId}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="status" status={charger.status} label={charger.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{charger.model}</td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4 text-primary" />
                          {charger.connectorCount}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {formatDate(charger.lastHeartbeat)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                            title="Restart"
                          >
                            <Power className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="More">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
