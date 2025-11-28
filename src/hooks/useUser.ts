"use client"

// Custom hook for using User Context
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }

  return context
}
