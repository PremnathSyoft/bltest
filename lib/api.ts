// Base API configuration
import { notifyToast } from './toast'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'

// Generic API client
export class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token')
    }
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getAuthToken()
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized - redirect to login or refresh token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/signin'
        }
      }
      notifyToast(`Request failed: ${response.status} ${response.statusText}`, 'error')
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    // Success notifications based on method/status
    try {
      const method = (config.method || 'GET').toUpperCase()
      const isGet = method === 'GET'
      const isMutate = method === 'POST' || method === 'PUT' || method === 'PATCH'
      const status = response.status

      if ((isGet && status === 200) || (isMutate && (status === 200 || status === 201))) {
        const successMessage = isGet
          ? 'Loaded successfully'
          : status === 201
            ? 'Created successfully'
            : 'Saved successfully'
        notifyToast(successMessage, 'success')
      }
    } catch {
      // ignore toast issues
    }

    // Gracefully handle empty responses (e.g., 204 No Content)
    if (response.status === 204) {
      return undefined as unknown as T
    }
    const rawText = await response.text()
    if (!rawText) {
      return undefined as unknown as T
    }
    try {
      return JSON.parse(rawText) as T
    } catch {
      // If not JSON, return as-is string
      return rawText as unknown as T
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const requestOptions: RequestInit = {
      method: 'POST',
      ...options,
    }

    if (data) {
      if (data instanceof FormData) {
        // Handle FormData (for file uploads, etc.)
        requestOptions.body = data
        // Remove Content-Type header to let browser set it with boundary for FormData
        requestOptions.headers = {
          ...(this.getAuthToken() && { Authorization: `Bearer ${this.getAuthToken()}` }),
          ...options?.headers,
        }
      } else {
        // Handle JSON data
        requestOptions.body = JSON.stringify(data)
        requestOptions.headers = {
          'Content-Type': 'application/json',
          ...(this.getAuthToken() && { Authorization: `Bearer ${this.getAuthToken()}` }),
          ...options?.headers,
        }
      }
    } else {
      requestOptions.headers = {
        'Content-Type': 'application/json',
        ...(this.getAuthToken() && { Authorization: `Bearer ${this.getAuthToken()}` }),
        ...options?.headers,
      }
    }

    return this.request<T>(endpoint, requestOptions)
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, data?: any): Promise<T> {
    const options: RequestInit = { method: 'DELETE' }
    
    if (data) {
      // For form data (like bulk delete endpoints)
      if (endpoint.includes('bulk')) {
        const formData = new FormData()
        Object.keys(data).forEach(key => {
          if (Array.isArray(data[key])) {
            data[key].forEach((item: any) => formData.append(key, item))
          } else {
            formData.append(key, data[key])
          }
        })
        options.body = formData
        // Remove Content-Type header to let browser set it with boundary for FormData
        options.headers = {
          ...(this.getAuthToken() && { Authorization: `Bearer ${this.getAuthToken()}` }),
        }
      } else {
        options.body = JSON.stringify(data)
      }
    }
    
    return this.request<T>(endpoint, options)
  }
}

export const apiClient = new ApiClient()