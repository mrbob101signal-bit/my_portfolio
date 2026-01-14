"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/lib/auth-context"

export default function PortfolioViewPage() {
  const [session, setSession] = useState<any>(null)
  const [portfolioData, setPortfolioData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userSession = getSession()
    if (!userSession) {
      router.push("/login")
      return
    }
    setSession(userSession)
    loadPortfolioData()
  }, [router])

  const loadPortfolioData = async () => {
    try {
      const res = await fetch("/api/portfolio/about")
      const data = await res.json()
      setPortfolioData(data)
    } catch (error) {
      console.error("Error loading portfolio data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio</h1>
            <p className="text-muted-foreground">
              Logged in as: <span className="font-medium text-accent">{session.email}</span>
              <span className="ml-3 inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                User (View Only)
              </span>
            </p>
          </div>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
            Logout
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading portfolio...</p>
          </div>
        ) : portfolioData ? (
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">{portfolioData.name}</h2>
              <p className="text-xl text-accent font-medium mb-4">{portfolioData.title}</p>
              <p className="text-muted-foreground mb-4">{portfolioData.bio}</p>
              <p className="text-foreground mb-6">{portfolioData.detailedBio}</p>

              {portfolioData.image && (
                <img
                  src={portfolioData.image}
                  alt={portfolioData.name}
                  className="w-48 h-48 rounded-lg object-cover mb-6"
                />
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">{portfolioData.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">{portfolioData.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">{portfolioData.location}</p>
                </div>
              </div>

              {portfolioData.additionalInfo && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-muted-foreground mb-2">Additional Information</p>
                  <p className="text-foreground">{portfolioData.additionalInfo}</p>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                📖 You are viewing this portfolio in <span className="font-medium">read-only mode</span>. 
                Only admins can edit and manage content.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unable to load portfolio data</p>
          </div>
        )}
      </div>
    </div>
  )
}
