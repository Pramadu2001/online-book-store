// Footer component
import type React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-2">About Us</h3>
            <p className="text-sm">Your one-stop shop for books from around the world.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-2">Contact</h3>
            <p className="text-sm">Email: info@bookstore.com</p>
            <p className="text-sm">Phone: 0785553667</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2025 BookStore. All rights reserved. K.P.S Chithakshana </p>
        </div>
      </div>
    </footer>
  )
}
