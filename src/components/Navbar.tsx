"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { useTheme } from "../hooks/useTheme"

export const Navbar: React.FC = () => {
  const location = useLocation()
  const { user, isAdmin } = useUser()
  const { theme, toggleTheme } = useTheme()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={`${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-blue-900"} text-white shadow-lg border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          📚 BookStore
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className={`transition-colors ${isActive("/") ? "text-blue-200 font-bold" : "hover:text-blue-200"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/catalog"
              className={`transition-colors ${
                isActive("/catalog") || location.pathname.startsWith("/book/")
                  ? "text-blue-200 font-bold"
                  : "hover:text-blue-200"
              }`}
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`transition-colors flex items-center gap-2 ${
                isActive("/cart") ? "text-blue-200 font-bold" : "hover:text-blue-200"
              }`}
            >
              Cart
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`transition-colors ${
                  isActive("/admin") ? "text-blue-200 font-bold" : "hover:text-blue-200"
                }`}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm">
              {user.name} ({user.role})
            </span>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  )
}
