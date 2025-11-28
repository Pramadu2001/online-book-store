"use client"

import { createBrowserRouter, Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Home } from "./_pages-old/Home"
import { Catalog } from "./_pages-old/Catalog"
import { BookDetails } from "./_pages-old/BookDetails"
import { Cart } from "./_pages-old/Cart"
import { Admin } from "./_pages-old/Admin"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
])
