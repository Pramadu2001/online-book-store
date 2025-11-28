"use client"

// Reusable Button component with TypeScript
import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "px-6 py-2 rounded-lg font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  )
}
