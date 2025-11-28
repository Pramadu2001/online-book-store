"use client"

import type React from "react"
import type { Book } from "../types/index"
import { Button } from "./Button"

interface BookCardProps {
  book: Book
  onAddToCart?: (book: Book) => void
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
        <img src={book.coverUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-semibold text-gray-700">{book.rating}</span>
          <span className="text-xs text-gray-500">({book.category})</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">${book.price.toFixed(2)}</span>
          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">
            {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>

        {onAddToCart && (
          <Button onClick={() => onAddToCart(book)} variant="primary" disabled={book.stock === 0} className="w-full">
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  )
}
