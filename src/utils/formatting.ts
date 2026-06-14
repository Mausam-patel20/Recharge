export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ")
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

export const formatEnergy = (kwh: number): string => {
  return `${kwh.toFixed(1)} kWh`
}

export const formatPower = (watts: number): string => {
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(1)} kW`
  }
  return `${watts.toFixed(0)} W`
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export const formatTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date))
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    online: "text-success bg-success/10 border-success/30",
    offline: "text-warning bg-warning/10 border-warning/30",
    charging: "text-primary bg-primary/10 border-primary/30",
    faulted: "text-danger bg-danger/10 border-danger/30",
    available: "text-success bg-success/10 border-success/30",
    reserved: "text-info bg-info/10 border-info/30",
    unavailable: "text-muted-foreground bg-muted border-border",
  }
  return statusMap[status] || "text-muted-foreground bg-muted border-border"
}

export const getAlertColorByServerity = (severity: string): string => {
  const severityMap: Record<string, string> = {
    critical: "text-danger bg-danger/10 border-danger/30",
    warning: "text-warning bg-warning/10 border-warning/30",
    info: "text-info bg-info/10 border-info/30",
  }
  return severityMap[severity] || "text-info bg-info/10 border-info/30"
}

export const getMapMarkerColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    online: "#10B981", // green
    offline: "#808080", // gray
    charging: "#3B82F6", // blue
    faulted: "#EF4444", // red
  }
  return colorMap[status] || "#808080"
}

export const calculateUptime = (status: string): number => {
  // Mock function - in real app would calculate from actual data
  if (status === "online" || status === "charging") {
    return Math.random() * 5 + 95 // 95-100%
  }
  if (status === "offline") {
    return Math.random() * 30 // 0-30%
  }
  return 50 // faulted
}
