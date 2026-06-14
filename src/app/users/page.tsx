"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/common/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Search, Plus, MoreHorizontal, Edit2, Trash2, Eye } from "lucide-react"

const mockUsers = [
  {
    id: "user-1",
    name: "John Anderson",
    email: "john@chargevision.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2025-06-12",
    createdAt: "2024-01-15",
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    email: "sarah@chargevision.com",
    role: "operator",
    status: "active",
    lastLogin: "2025-06-12",
    createdAt: "2024-02-20",
  },
  {
    id: "user-3",
    name: "Michael Rodriguez",
    email: "michael@chargevision.com",
    role: "operator",
    status: "active",
    lastLogin: "2025-06-11",
    createdAt: "2024-03-10",
  },
  {
    id: "user-4",
    name: "Emily Watson",
    email: "emily@chargevision.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2025-05-20",
    createdAt: "2024-04-05",
  },
]

const getRoleColor = (role: string) => {
  const roleMap: Record<string, string> = {
    super_admin: "bg-danger/20 text-danger border-danger/30",
    operator: "bg-primary/20 text-primary border-primary/30",
    viewer: "bg-muted text-muted-foreground border-border",
  }
  return roleMap[role] || roleMap.viewer
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const filtered = mockUsers
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filterRole === "all" || user.role === filterRole
      return matchesSearch && matchesRole
    })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage team members and permissions</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="flex-1 min-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="operator">Operator</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filtered.length} of {mockUsers.length})</CardTitle>
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
                      Email
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Role
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Last Login
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <p className="font-medium text-foreground">{user.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getRoleColor(user.role)}`}>
                          {user.role === "super_admin" ? "Super Admin" : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          status={user.status}
                          label={user.status === "active" ? "Active" : "Inactive"}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-danger" />
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
