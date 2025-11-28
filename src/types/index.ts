// TypeScript interfaces for the bookstore application
export interface Book {
  id: number
  title: string
  author: string
  category: string
  price: number
  rating: number
  stock: number
  coverUrl: string
  description: string
}

export interface CartItem extends Book {
  quantity: number
}

export interface User {
  id: string
  role: "customer" | "admin"
  name: string
}
