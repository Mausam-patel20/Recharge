"use client"

import React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card } from "./Card"

interface MetricCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    direction: "up" | "down"
  }
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  className = "",
}) => {
  return (
    <Card className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        {icon && <div className="text-primary opacity-20 text-4xl">{icon}</div>}
      </div>

      {trend && (
        <div className="flex items-center text-sm">
          {trend.direction === "up" ? (
            <ArrowUpRight className="w-4 h-4 text-success mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-danger mr-1" />
          )}
          <span className={trend.direction === "up" ? "text-success" : "text-danger"}>
            {trend.direction === "up" ? "+" : ""}{trend.value}%
          </span>
          <span className="text-muted-foreground ml-1">vs last month</span>
        </div>
      )}
    </Card>
  )
}

interface AlertCardProps {
  type: string
  severity: "critical" | "warning" | "info"
  message: string
  timestamp: string
  onAcknowledge?: () => void
  onDismiss?: () => void
}

export const AlertCard: React.FC<AlertCardProps> = ({
  type,
  severity,
  message,
  timestamp,
  onAcknowledge,
  onDismiss,
}) => {
  const severityColors = {
    critical: "border-l-4 border-danger bg-danger/5",
    warning: "border-l-4 border-warning bg-warning/5",
    info: "border-l-4 border-info bg-info/5",
  }

  const severityIconBg = {
    critical: "bg-danger/10 text-danger",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  }

  return (
    <Card className={`${severityColors[severity]} mb-3`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg mt-0.5 ${severityIconBg[severity]}`}>
            <span className="text-sm font-bold">!</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">{type}</p>
            <p className="text-sm text-muted-foreground mb-2">{message}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          {onAcknowledge && (
            <button
              onClick={onAcknowledge}
              className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Acknowledge
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
