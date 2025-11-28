"use client"

// Admin page for managing books
import type React from "react"
import { useState } from "react"
import { useUser } from "../hooks/useUser"
import { useBooks } from "../hooks/useBooks"
import type { Book } from "../types/index"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { Input } from "../components/Input"
import { ConfirmDialog } from "../components/ConfirmDialog"

export const Admin: React.FC = () => {
  const { user, isAdmin, login, logout } = useUser()
  const { books, addBook, updateBook, deleteBook } = useBooks()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [bookToDelete, setBookToDelete] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    coverUrl: "",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle login demo
  const handleDemoLogin = () => {
    login("Admin User", "admin")
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.author.trim()) newErrors.author = "Author is required"
    if (!formData.category.trim()) newErrors.category = "Category is required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.stock || Number.parseInt(formData.stock) < 0) newErrors.stock = "Valid stock is required"
    if (formData.rating && (Number.parseFloat(formData.rating) < 0 || Number.parseFloat(formData.rating) > 5)) {
      newErrors.rating = "Rating must be between 0 and 5"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Open modal for new book
  const handleAddNew = () => {
    setEditingBook(null)
    setFormData({
      title: "",
      author: "",
      category: "",
      price: "",
      rating: "",
      stock: "",
      coverUrl: "",
      description: "",
    })
    setErrors({})
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price.toString(),
      rating: book.rating.toString(),
      stock: book.stock.toString(),
      coverUrl: book.coverUrl,
      description: book.description,
    })
    setErrors({})
    setIsModalOpen(true)
  }

  // Submit form (add or update)
  const handleSubmit = () => {
    if (!validateForm()) return

    const bookData = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      rating: Number.parseFloat(formData.rating) || 0,
      stock: Number.parseInt(formData.stock),
      coverUrl: formData.coverUrl || "/placeholder.svg",
      description: formData.description,
    }

    if (editingBook) {
      updateBook(editingBook.id, bookData)
      alert("Book updated successfully!")
    } else {
      addBook(bookData)
      alert("Book added successfully!")
    }

    setIsModalOpen(false)
  }

  // Open delete confirmation
  const handleDeleteClick = (bookId: number) => {
    setBookToDelete(bookId)
    setIsDeleteDialogOpen(true)
  }

  // Confirm delete
  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete)
      alert("Book deleted successfully!")
    }
    setIsDeleteDialogOpen(false)
    setBookToDelete(null)
  }

  // Check if not logged in
  if (!user) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">Please log in as admin to access this page.</p>
          <Button onClick={handleDemoLogin}>Demo Admin Login</Button>
        </div>
      </main>
    )
  }

  // Check if not admin
  if (!isAdmin) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <div className="space-x-4">
            <Button onClick={logout} variant="secondary">
              Logout
            </Button>
            <Button onClick={handleDemoLogin}>Login as Admin</Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Logged in as: {user.name}</p>
        </div>
        <div className="space-x-4">
          <Button onClick={handleAddNew}>Add New Book</Button>
          <Button onClick={logout} variant="secondary">
            Logout
          </Button>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{book.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{book.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">${book.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{book.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{book.rating}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingBook ? "Edit Book" : "Add New Book"}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        submitText={editingBook ? "Update" : "Add"}
      >
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="Enter book title"
        />
        <Input
          label="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          error={errors.author}
          placeholder="Enter author name"
        />
        <Input
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          error={errors.category}
          placeholder="e.g., Fiction, Mystery, Science"
        />
        <Input
          label="Price ($)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          error={errors.price}
          placeholder="0.00"
        />
        <Input
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          error={errors.stock}
          placeholder="0"
        />
        <Input
          label="Rating (0-5)"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          error={errors.rating}
          placeholder="0.0"
        />
        <Input
          label="Cover Image URL"
          value={formData.coverUrl}
          onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
          placeholder="https://..."
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter book description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        isDangerous
      />
    </main>
  )
}
