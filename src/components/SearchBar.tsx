"use client"

// Reusable SearchBar component
import type React from "react"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  debounceDelay?: number
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search...", debounceDelay = 500 }) => {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsSearching(true)

    // Debounce search
    const timer = setTimeout(() => {
      onSearch(value)
      setIsSearching(false)
    }, debounceDelay)

    return () => clearTimeout(timer)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <span className="text-gray-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 outline-none"
        />
        {query && (
          <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
            ×
          </button>
        )}
        {isSearching && <span className="text-blue-500 text-sm">Searching...</span>}
      </div>
    </div>
  )
}
