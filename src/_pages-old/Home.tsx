"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import type { Book } from "../types/index"
import { BookCard } from "../components/BookCard"
import { Button } from "../components/Button"
import { mockBooks } from "../data/mockBooks"
import { useCart } from "../hooks/useCart"

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const featuredBooks = mockBooks.slice(0, 3)

  const handleAddToCart = (book: Book) => {
    addToCart(book)
    alert(`"${book.title}" added to cart!`)
  }

  const handleBrowseCatalog = () => {
    navigate("/catalog")
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Welcome Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to BookStore</h2>
          <p className="text-xl mb-8">Discover your next favorite book from our curated collection</p>
          <Button variant="secondary" className="px-8 py-3 text-lg" onClick={handleBrowseCatalog}>
            Browse Catalog
          </Button>
        </div>
      </section>

      {/* Featured Books Section */}
      <section>
        <h3 className="text-3xl font-bold mb-8">Featured Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="mt-16 bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Why Choose BookStore?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <h4 className="font-bold mb-2">Fast Shipping</h4>
            <p className="text-gray-600">Get your books delivered quickly and safely</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <h4 className="font-bold mb-2">Best Prices</h4>
            <p className="text-gray-600">Competitive prices on all books</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⭐</div>
            <h4 className="font-bold mb-2">Quality Selection</h4>
            <p className="text-gray-600">Carefully curated selection of books</p>
          </div>
        </div>
      </section>
    </main>
  )
}
