"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/common/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { mockChargers, mockLocations } from "@/data/mock"
import { Zap } from "lucide-react"

export default function MapPage() {
  const [selectedCharger, setSelectedCharger] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const charger = selectedCharger
    ? mockChargers.find((c) => c.id === selectedCharger)
    : null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "🟢"
      case "charging":
        return "🔵"
      case "offline":
        return "⚫"
      case "faulted":
        return "🔴"
      default:
        return "⚪"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Network Map</h1>
          <p className="text-muted-foreground mt-1">
            Visualize your charging network across locations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Charger Locations</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {/* Placeholder Map */}
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                  {/* Map Background Grid */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(0deg, #888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>

                  {/* Charger Markers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {mockChargers.map((charger, idx) => (
                        <button
                          key={charger.id}
                          onClick={() => setSelectedCharger(charger.id)}
                          className="absolute hover:scale-125 transition-transform"
                          style={{
                            left: `${10 + (idx * 12) % 80}%`,
                            top: `${20 + ((idx * 7) % 60)}%`,
                            cursor: "pointer",
                          }}
                          title={charger.name}
                        >
                          <div className="text-2xl">{getStatusIcon(charger.status)}</div>
                          <div className="text-xs font-bold text-foreground mt-1 bg-card rounded px-2 py-1 whitespace-nowrap pointer-events-none shadow">
                            {charger.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/95 rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold text-foreground mb-2">Legend</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span>🟢</span>
                        <span className="text-muted-foreground">Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🔵</span>
                        <span className="text-muted-foreground">Charging</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🔴</span>
                        <span className="text-muted-foreground">Faulted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⚫</span>
                        <span className="text-muted-foreground">Offline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockLocations.map((location) => {
                  const locationChargers = mockChargers.filter(
                    (c) => c.locationId === location.id
                  )
                  const onlineCount = locationChargers.filter(
                    (c) => c.status === "online"
                  ).length

                  return (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedLocation === location.id
                          ? "bg-primary/10 border border-primary"
                          : "hover:bg-muted border border-border"
                      }`}
                    >
                      <p className="text-sm font-medium text-foreground mb-1">
                        {location.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">{location.city}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Zap className="w-3 h-3" />
                        <span>
                          {onlineCount}/{locationChargers.length} online
                        </span>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Selected Charger Info */}
            {charger && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Charger Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Name</p>
                    <p className="font-medium text-foreground">{charger.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge variant="status" status={charger.status} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Model</p>
                    <p className="font-medium text-foreground">{charger.model}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Connectors</p>
                    <div className="flex gap-1">
                      {charger.connectors.map((conn) => (
                        <div
                          key={conn.id}
                          className="flex-1 p-2 rounded-lg bg-muted text-center"
                        >
                          <p className="text-xs font-bold text-foreground">{conn.connectorId}</p>
                          <Badge
                            variant="status"
                            status={conn.status}
                            className="mt-1 justify-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Chargers</span>
                  <span className="font-bold">{mockChargers.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Online</span>
                  <span className="font-bold text-success">
                    {mockChargers.filter((c) => c.status === "online").length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Offline</span>
                  <span className="font-bold text-warning">
                    {mockChargers.filter((c) => c.status === "offline").length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Faulted</span>
                  <span className="font-bold text-danger">
                    {mockChargers.filter((c) => c.status === "faulted").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
