"use client"

import React from "react"
import { getStatusColor, getAlertColorByServerity } from "@/utils/formatting"

interface BadgeProps {
  variant?: "status" | "alert" | "default"
  status?: string
  label?: string
  children?: React.ReactNode
  className?: string
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = "default", status, label, children, className = "" }, ref) => {
    let colorClass = "bg-muted text-muted-foreground border-border"

    if (variant === "status" && status) {
      colorClass = getStatusColor(status)
    } else if (variant === "alert" && status) {
      colorClass = getAlertColorByServerity(status)
    }

    const baseStyles = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border"

    return (
      <div ref={ref} className={`${baseStyles} ${colorClass} ${className}`}>
        <span className="w-2 h-2 rounded-full mr-1.5 bg-current opacity-75"></span>
        {children || label}
      </div>
    )
  }
)

Badge.displayName = "Badge"
