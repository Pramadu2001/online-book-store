"use client"

// User Context for authentication and role-based access
import type React from "react"
import { createContext, useState, useCallback, type ReactNode, useMemo } from "react"
import type { User } from "../types/index"

interface UserContextType {
  user: User | null
  login: (name: string, role: "customer" | "admin") => void
  logout: () => void
  isAdmin: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Initialize user from localStorage or null
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  })

  // Login user and save to localStorage
  const login = useCallback((name: string, role: "customer" | "admin") => {
    const newUser: User = {
      id: Date.now().toString(),
      role,
      name,
    }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }, [])

  // Logout user and remove from localStorage
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  const isAdmin = user?.role === "admin"

  const value: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
      isAdmin,
    }),
    [user, login, logout, isAdmin],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
