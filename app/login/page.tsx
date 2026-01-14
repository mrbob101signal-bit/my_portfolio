"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "user">("user")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simple validation
      if (!email || !password) {
        setError("Please enter email and password")
        setLoading(false)
        return
      }

      // Demo credentials
      const adminEmail = "admin@portfolio.com"
      const adminPassword = "admin123"
      const userEmail = "user@portfolio.com"
      const userPassword = "user123"

      let loginRole: "admin" | "user" | null = null

      if (email === adminEmail && password === adminPassword) {
        loginRole = "admin"
      } else if (email === userEmail && password === userPassword) {
        loginRole = "user"
      } else {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      // Store session in localStorage
      const sessionData = {
        email,
        role: loginRole,
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("portfolio_session", JSON.stringify(sessionData))

      // Redirect based on role
      if (loginRole === "admin") {
        router.push("/admin")
      } else {
        router.push("/portfolio-view")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Portfolio Login</h1>
          <p className="text-muted-foreground text-center mb-8">Select your role and login</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Select Role</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 py-2 px-4 rounded-lg border transition ${
                    role === "admin"
                      ? "bg-accent text-white border-accent"
                      : "bg-secondary border-border hover:border-accent"
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex-1 py-2 px-4 rounded-lg border transition ${
                    role === "user"
                      ? "bg-accent text-white border-accent"
                      : "bg-secondary border-border hover:border-accent"
                  }`}
                >
                  User
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "admin" ? "admin@portfolio.com" : "user@portfolio.com"}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={role === "admin" ? "admin123" : "user123"}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-secondary rounded-lg border border-border">
            <h3 className="text-sm font-medium mb-3">Demo Credentials:</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Admin:</p>
                <p>Email: admin@portfolio.com</p>
                <p>Password: admin123</p>
              </div>
              <div>
                <p className="font-medium text-foreground">User:</p>
                <p>Email: user@portfolio.com</p>
                <p>Password: user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
