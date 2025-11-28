"use client"

import React, { useState, useMemo, useCallback } from "react"
import type { Book } from "../types/index"
import { BookCard } from "../components/BookCard"
import { SearchBar } from "../components/SearchBar"
import { mockBooks } from "../data/mockBooks"
import { useCart } from "../hooks/useCart"
import { useDebounce } from "../hooks/useDebounce"

export const Catalog: React.FC = () => {
  const [books] = useState<Book[]>(mockBooks)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { addToCart } = useCart()

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const categories = ["All", ...new Set(books.map((book) => book.category))]

  // Filter and search books
  const filteredBooks = useMemo(() => {
    let result = books

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((book) => book.category === selectedCategory)
    }

    // Search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query),
      )
    }

    return result
  }, [books, selectedCategory, debouncedSearchQuery])

  const handleAddToCart = useCallback(
    (book: Book) => {
      addToCart(book)
      alert(`"${book.title}" added to cart!`)
    },
    [addToCart],
  )

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Catalog</h1>
        <p className="text-gray-600">Browse our collection of {books.length} books</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} placeholder="Search by title, author, or description..." />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
          {debouncedSearchQuery && ` matching "${debouncedSearchQuery}"`}
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <MemoizedBookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {debouncedSearchQuery
              ? `No books found matching "${debouncedSearchQuery}"`
              : "No books found in this category."}
          </p>
        </div>
      )}
    </main>
  )
}

// Memoized BookCard to prevent unnecessary re-renders
const MemoizedBookCard = React.memo(BookCard)
