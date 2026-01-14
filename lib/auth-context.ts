export interface SessionData {
  email: string
  role: "admin" | "user"
  loginTime: string
}

export const getSession = (): SessionData | null => {
  if (typeof window === "undefined") return null

  const session = localStorage.getItem("portfolio_session")
  return session ? JSON.parse(session) : null
}

export const logout = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("portfolio_session")
}

export const isAdmin = (): boolean => {
  const session = getSession()
  return session?.role === "admin"
}

export const isLoggedIn = (): boolean => {
  return getSession() !== null
}
