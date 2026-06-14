"use client"

import React from "react"
import { Bell, Settings, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface HeaderProps {
  onMenuClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-warning" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>

        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse" />
        </button>

        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-border" />

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">John Anderson</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-sm">
            JA
          </div>
        </div>
      </div>
    </div>
  )
}
