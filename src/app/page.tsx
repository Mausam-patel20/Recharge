import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Zap, BarChart3, Map } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
              CV
            </div>
            <h1 className="text-xl font-bold text-foreground">ChargeVision</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Button size="sm" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Enterprise EV Charger Monitoring
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Monitor, manage, and optimize your entire EV charging network in real-time with industry-leading insights and analytics.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/map">View Map</Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="rounded-xl bg-card border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Real-time Monitoring</h3>
              <p className="text-muted-foreground">
                Live status updates, energy metrics, and performance data for all chargers
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Detailed insights on utilization, revenue, and energy consumption patterns
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Network Map</h3>
              <p className="text-muted-foreground">
                Visualize your entire network with interactive maps and location analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
