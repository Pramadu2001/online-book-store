"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { Button } from "../components/Button"

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const tax = subtotal * 0.1
  const shipping = cartItems.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      clearCart()
      alert("Order placed successfully!")
      setIsCheckingOut(false)
      navigate("/")
    }, 1500)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Button onClick={() => navigate("/catalog")}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                  <img
                    src={item.coverUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.author}</p>
                    <p className="text-lg font-bold text-blue-600">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 font-medium mb-4"
                    >
                      Remove
                    </button>

                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-bold text-gray-900 mt-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 border-b border-gray-300 pb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button onClick={handleCheckout} disabled={isCheckingOut} className="w-full py-3">
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <button
                onClick={() => navigate("/catalog")}
                className="w-full mt-3 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
