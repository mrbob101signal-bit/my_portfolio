"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/lib/auth-context"
import { Trash2, Mail, CheckCircle2 } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "read" | "unread"
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [session, setSession] = useState<any>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userSession = getSession()
    if (!userSession) {
      router.push("/login")
      return
    }

    if (userSession.role !== "admin") {
      router.push("/portfolio-view")
      return
    }

    setSession(userSession)
    setIsAuthorized(true)
    loadMessages()
  }, [router])

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/contact")
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id))
        setSelectedMessage(null)
        alert("Message deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Error deleting message")
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "read" }),
      })

      if (res.ok) {
        setMessages(
          messages.map((m) =>
            m.id === id ? { ...m, status: "read" } : m
          )
        )
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: "read" })
        }
      }
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!isAuthorized || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Messages</h1>
            <p className="text-muted-foreground">
              Manage contact form submissions
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/admin")}
              className="bg-secondary hover:bg-secondary/80 text-foreground"
            >
              ← Back to Admin
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Messages</p>
            <p className="text-3xl font-bold text-foreground">{messages.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Unread</p>
            <p className="text-3xl font-bold text-accent">{unreadCount}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Read</p>
            <p className="text-3xl font-bold text-foreground">
              {messages.length - unreadCount}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 bg-secondary border-b border-border">
                <h2 className="font-bold text-foreground">Messages</h2>
              </div>

              {loading ? (
                <div className="p-6 text-center text-muted-foreground">
                  Loading messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No messages yet
                </div>
              ) : (
                <div className="max-h-[600px] overflow-y-auto">
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg)
                        if (msg.status === "unread") {
                          handleMarkAsRead(msg.id)
                        }
                      }}
                      className={`w-full text-left p-4 border-b border-border hover:bg-secondary/50 transition ${
                        selectedMessage?.id === msg.id
                          ? "bg-secondary border-l-4 border-l-accent"
                          : ""
                      } ${msg.status === "unread" ? "bg-accent/5" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-foreground text-sm truncate">
                          {msg.name}
                        </h3>
                        {msg.status === "unread" && (
                          <span className="inline-block w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1"></span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedMessage.subject}
                      </h2>
                      <p className="text-muted-foreground text-sm mt-2">
                        From: {selectedMessage.name} ({selectedMessage.email})
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        selectedMessage.status === "unread"
                          ? "bg-accent/20 text-accent"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {selectedMessage.status === "unread" ? "Unread" : "Read"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="p-6 bg-secondary border-t border-border flex gap-3">
                  <Button
                    onClick={() =>
                      window.open(`mailto:${selectedMessage.email}`)
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Reply Email
                  </Button>
                  <Button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
