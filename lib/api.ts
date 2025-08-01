// Base API configuration
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
          window.location.href = '/login'
        }
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
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