"use client"

import type React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { mockBooks } from "../data/mockBooks"
import { useCart } from "../hooks/useCart"

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const book = mockBooks.find((b) => b.id === Number.parseInt(id || "0"))

  if (!book) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <Button onClick={() => navigate("/catalog")}>Back to Catalog</Button>
        </div>
      </main>
    )
  }

  const relatedBooks = mockBooks.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 3)

  const handleAddToCart = () => {
    addToCart(book)
    alert(`"${book.title}" added to cart!`)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/catalog")}
        className="text-blue-600 hover:text-blue-700 font-medium mb-8 flex items-center gap-2"
      >
        ← Back to Catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex justify-center">
          <img
            src={book.coverUrl || "/placeholder.svg"}
            alt={book.title}
            className="w-full max-w-sm rounded-lg shadow-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-2xl">★</span>
            <span className="text-lg font-semibold text-gray-700">{book.rating}</span>
            <span className="text-gray-500 text-sm">(based on customer reviews)</span>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">{book.category}</div>
            <div
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                book.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-1">Price</p>
            <p className="text-4xl font-bold text-blue-600">${book.price.toFixed(2)}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          <Button onClick={handleAddToCart} disabled={book.stock === 0} className="w-full py-3 text-lg">
            {book.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>

      {relatedBooks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBooks.map((relatedBook) => (
              <div key={relatedBook.id} className="cursor-pointer" onClick={() => navigate(`/book/${relatedBook.id}`)}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={relatedBook.coverUrl || "/placeholder.svg"}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{relatedBook.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedBook.author}</p>
                    <p className="text-lg font-bold text-blue-600">${relatedBook.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
