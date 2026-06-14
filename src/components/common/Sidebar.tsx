"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Zap,
  Map,
  AlertCircle,
  BarChart3,
  Users,
  Settings,
  X,
} from "lucide-react"

interface NavItem {
  label: string
  href?: string
  icon: React.ReactNode
  badge?: number
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Chargers", href: "/chargers", icon: <Zap className="w-5 h-5" /> },
  { label: "Map", href: "/map", icon: <Map className="w-5 h-5" /> },
  { label: "Analytics", href: "/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Alerts", href: "/alerts", icon: <AlertCircle className="w-5 h-5" />, badge: 2 },
  { label: "Users", href: "/users", icon: <Users className="w-5 h-5" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
]

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bg-card border-r border-border z-40">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
              CV
            </div>
            <h1 className="text-xl font-bold text-foreground">ChargeVision</h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white text-sm font-bold">
              JA
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">John Anderson</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-64 bg-card border-r border-border overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
                  CV
                </div>
                <h1 className="text-xl font-bold text-foreground">ChargeVision</h1>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="px-4 py-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
