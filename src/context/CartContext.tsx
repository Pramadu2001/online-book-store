"use client"

// Cart Context for global cart state management
import type React from "react"
import { createContext, useState, useCallback, type ReactNode, useMemo } from "react"
import type { CartItem, Book } from "../types/index"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: number) => void
  updateQuantity: (bookId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Add item to cart or update quantity if already exists
  const addToCart = useCallback((book: Book) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === book.id)

      if (existingItem) {
        // Update quantity if item already in cart
        return prev.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item))
      }

      // Add new item to cart
      return [...prev, { ...book, quantity: 1 }]
    })
  }, [])

  // Remove item from cart
  const removeFromCart = useCallback((bookId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId))
  }, [])

  // Update quantity of cart item
  const updateQuantity = useCallback((bookId: number, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== bookId)
      }

      return prev.map((item) => (item.id === bookId ? { ...item, quantity } : item))
    })
  }, [])

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  // Calculate total cart value
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  const value: CartContextType = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
