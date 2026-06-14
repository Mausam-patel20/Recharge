// User & Auth Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId: string
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export type UserRole = "super_admin" | "operator" | "viewer"

// Charger Types
export type ChargerStatus = "online" | "offline" | "charging" | "faulted"
export type ConnectorStatus = "available" | "charging" | "reserved" | "faulted" | "unavailable"

export interface Charger {
  id: string
  name: string
  model: string
  serialNumber: string
  status: ChargerStatus
  firmware: string
  ocppVersion: string
  locationId: string
  connectorCount: number
  lastHeartbeat: string
  latitude: number
  longitude: number
  connectors: Connector[]
  createdAt: string
  updatedAt: string
}

export interface Connector {
  id: string
  chargerId: string
  connectorId: number
  type: string
  status: ConnectorStatus
  currentPower: number
  voltage: number
  current: number
  temperature: number
  sessionId?: string
  lastUpdated: string
}

// Session Types
export interface ChargingSession {
  id: string
  chargerId: string
  connectorId: number
  userId?: string
  vehicleId?: string
  startTime: string
  endTime?: string
  energyDelivered: number
  cost: number
  status: "active" | "completed" | "stopped" | "error"
  meterStart: number
  meterEnd?: number
}

// Alert Types
export type AlertSeverity = "critical" | "warning" | "info"
export type AlertStatus = "open" | "acknowledged" | "resolved"
export type AlertType =
  | "charger_offline"
  | "connector_fault"
  | "emergency_stop"
  | "communication_lost"
  | "over_temperature"
  | "power_failure"

export interface Alert {
  id: string
  chargerId: string
  type: AlertType
  severity: AlertSeverity
  status: AlertStatus
  message: string
  createdAt: string
  acknowledgedAt?: string
  resolvedAt?: string
  assignedTechnicianId?: string
}

// Location Types
export interface Location {
  id: string
  organizationId: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude: number
  longitude: number
  chargers: string[]
  createdAt: string
  updatedAt: string
}

// Analytics Types
export interface EnergyAnalytics {
  date: string
  energyDelivered: number
  peakUsage: number
  averageSessionLength: number
  sessionsCount: number
}

export interface RevenueAnalytics {
  date: string
  revenue: number
  transactionsCount: number
  averageTransactionValue: number
}

export interface ChargerUtilization {
  chargerId: string
  name: string
  utilizationPercentage: number
  activeConnectors: number
  totalConnectors: number
  uptime: number
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalChargers: number
  onlineChargers: number
  offlineChargers: number
  activeSessions: number
  revenueToday: number
  energyDeliveredToday: number
  chargerStatusDistribution: {
    available: number
    charging: number
    faulted: number
    offline: number
  }
}

// Organization Types
export interface Organization {
  id: string
  name: string
  logo?: string
  website?: string
  phone?: string
  email?: string
  address?: string
  createdAt: string
  updatedAt: string
}
