"use client"

// Custom hook for managing books with CRUD operations
import { useState, useCallback } from "react"
import type { Book } from "../types/index"
import { mockBooks } from "../data/mockBooks"

interface UseBookshook {
  books: Book[]
  addBook: (book: Omit<Book, "id">) => void
  updateBook: (id: number, book: Omit<Book, "id">) => void
  deleteBook: (id: number) => void
  getBook: (id: number) => Book | undefined
}

export const useBooks = (): UseBookshook => {
  const [books, setBooks] = useState<Book[]>(mockBooks)

  const addBook = useCallback(
    (newBook: Omit<Book, "id">) => {
      const book: Book = {
        ...newBook,
        id: Math.max(...books.map((b) => b.id), 0) + 1,
      }
      setBooks((prev) => [...prev, book])
    },
    [books],
  )

  const updateBook = useCallback((id: number, updatedBook: Omit<Book, "id">) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...updatedBook, id } : book)))
  }, [])

  const deleteBook = useCallback((id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }, [])

  const getBook = useCallback(
    (id: number) => {
      return books.find((book) => book.id === id)
    },
    [books],
  )

  return { books, addBook, updateBook, deleteBook, getBook }
}
