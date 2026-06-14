import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Zap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-primary/5">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">ChargeVision</h1>
          </div>
          <p className="text-muted-foreground">EV Charger Monitoring Platform</p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl bg-card border border-border p-8 shadow-lg">
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@chargevision.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:text-primary-600 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button className="w-full">Sign In</Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24v-11h-3v-3.6h3v-2.1c0-3 1.8-4.6 4.5-4.6 1.3 0 2.4.1 2.7.1v3.1h-1.9c-1.5 0-1.8.7-1.8 1.8v2.4h3.6l-.5 3.6h-3.1V24z" />
              </svg>
              Microsoft
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need an account?{" "}
          <Link href="#" className="text-primary hover:text-primary-600 transition-colors font-medium">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
