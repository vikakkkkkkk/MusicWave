"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  subscription: "free" | "premium"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Проверяем сохраненного пользователя при загрузке
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      subscription: "free",
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const register = async (name: string, email: string, password: string) => {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: "1",
      name,
      email,
      subscription: "free",
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("favorites")
    localStorage.removeItem("downloads")
    localStorage.removeItem("playHistory")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
