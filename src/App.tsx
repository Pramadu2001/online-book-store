"use client"
import { RouterProvider } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { UserProvider } from "./context/UserContext"
import { ThemeProvider } from "./context/ThemeContext"
import { router } from "./router"
import { useTheme } from "./hooks/useTheme"
import "./App.css"

// Inner component to use theme
const AppContent = () => {
  const { theme } = useTheme()

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <RouterProvider router={router} />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
