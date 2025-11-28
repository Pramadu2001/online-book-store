"use client"

// Custom hook for using Cart Context
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}
