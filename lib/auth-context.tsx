'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, refreshToken: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Function to check if JWT token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    } catch (error) {
      console.error('Error parsing token:', error)
      return true // Treat invalid tokens as expired
    }
  }

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      // Check if token is expired
      if (isTokenExpired(storedToken)) {
        // Token is expired, clear storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      } else {
        // Token is valid
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const login = (accessToken: string, refreshToken: string, userData: User) => {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(accessToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // Calculate isAuthenticated based on token validity
  const isAuthenticated = !!token && !!user && !isTokenExpired(token)

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}