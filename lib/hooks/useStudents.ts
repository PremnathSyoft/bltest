'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api'

// Types based on the API documentation
export interface Student {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
  mobile_number: string
  email: string
  profile_pic?: string
  role: 'SuperAdmin' | 'Admin' | 'Customer' | 'Instructor'
  price_per_hour?: number
  dob: string
  terms_accepted: boolean
  location_ids: string[]
  driving_license_number?: string
  driving_license_image?: string
  address_proof_image?: string
  verification_status: 'pending' | 'approved' | 'rejected'
  verification_notes?: string
  created_at?: string
  updated_at?: string
}

export interface CreateStudentData {
  first_name: string
  last_name: string
  date_of_birth: string
  mobile_number: string
  email: string
  profile_pic?: string
  role: 'SuperAdmin' | 'Admin' | 'Customer' | 'Instructor'
  price_per_hour?: number
  dob: string
  terms_accepted: boolean
  location_ids: string[]
  driving_license_number?: string
  driving_license_image?: string
  address_proof_image?: string
  verification_status?: 'pending' | 'approved' | 'rejected'
  verification_notes?: string
  password: string
}

// API Response structure that matches the actual backend
export interface ApiResponse {
  status: number
  message: string
  data: {
    total: number
    page: number
    offset: number
    data: Student[]
    pages: number
  }
}

// Internal structure we use in the frontend
export interface StudentsResponse {
  data: Student[]
  total?: number
  page?: number
  per_page?: number
  total_pages?: number
}

export interface StudentsQueryParams {
  page?: number
  offset?: number
  filters?: string
}

// Fetch students with pagination and filters
export const useStudents = (params: StudentsQueryParams = {}) => {
  return useQuery({
    queryKey: ['students', params],
    queryFn: async (): Promise<StudentsResponse> => {
      try {
        const searchParams = new URLSearchParams()
        
        if (params.page) searchParams.append('page', params.page.toString())
        if (params.offset) searchParams.append('offset', params.offset.toString())
        if (params.filters) searchParams.append('filters', params.filters)

        const query = searchParams.toString()
        const endpoint = `/api/customers${query ? `?${query}` : ''}`
        
        console.log('Fetching students from:', endpoint)
        const response = await apiClient.get<ApiResponse>(endpoint)
        console.log('Students API response:', response)
        
        // Handle the actual API response structure
        if (response && typeof response === 'object') {
          // Check if response has status, message, data structure (the actual API format)
          if (response.status === 200 && response.data && typeof response.data === 'object') {
            // The actual data array is nested in response.data.data
            if (Array.isArray(response.data.data)) {
              return {
                data: response.data.data,
                total: response.data.total,
                page: response.data.page,
                per_page: response.data.offset,
                total_pages: response.data.pages
              } as StudentsResponse
            }
          }
          
          // Fallback: check if response.data is directly an array
          if (Array.isArray(response.data)) {
            return { data: response.data } as StudentsResponse
          }
          
          // If response itself is an array, wrap it
          if (Array.isArray(response)) {
            return { data: response } as StudentsResponse
          }
          
          // Try to find any array in the response
          const dataArray = Object.values(response).find(value => 
            value && typeof value === 'object' && Array.isArray(value.data)
          )
          if (dataArray && Array.isArray(dataArray.data)) {
            return { data: dataArray.data } as StudentsResponse
          }
        }
        
        // Fallback: return empty data structure
        console.warn('Unexpected API response structure:', response)
        return { data: [] } as StudentsResponse
      } catch (error) {
        console.error('Error fetching students:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Create a new student
export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateStudentData): Promise<Student> => {
      return apiClient.post<Student>('/api/customers', data)
    },
    onSuccess: () => {
      // Invalidate and refetch students list
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Update a student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateStudentData> }): Promise<Student> => {
      return apiClient.put<Student>(`/api/customers/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Delete a student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      return apiClient.delete(`/api/customers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Bulk delete students
export const useBulkDeleteStudents = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (ids: string[]): Promise<void> => {
      return apiClient.delete('/api/customers/bulk', { ids })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Import students from file
export const useImportStudents = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (file: File): Promise<any> => {
      const formData = new FormData()
      formData.append('file', file)
      
      const token = localStorage.getItem('access_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/customers/import`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Import failed: ${response.status} ${response.statusText}`)
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Export students
export const useExportStudents = () => {
  return useMutation({
    mutationFn: async ({ 
      format, 
      user_ids = [], 
      filters = '' 
    }: { 
      format: 'csv' | 'excel' | 'pdf'
      user_ids?: string[]
      filters?: string 
    }): Promise<string> => {
      const token = localStorage.getItem('access_token')
      
      const formData = new FormData()
      formData.append('export_format', format)
      
      if (user_ids.length > 0) {
        user_ids.forEach(id => formData.append('user_ids', id))
      }
      
      if (filters) {
        formData.append('filters', filters)
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/customers/export`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Export failed: ${response.status} ${response.statusText}`)
      }
      
      // Handle file download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `students_export.${format === 'excel' ? 'xlsx' : format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      return 'Export completed successfully'
    },
  })
}
