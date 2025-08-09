import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export interface Location {
  id?: string
  name: string
  address?: string
  city?: string
  state?: string
  country?: string
  zip_code?: string
  latitude?: number
  longitude?: number
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  details: () => [...locationKeys.all, 'detail'] as const,
  detail: (id: string) => [...locationKeys.details(), id] as const,
}

export function useLocations() {
  return useQuery({
    queryKey: locationKeys.lists(),
    queryFn: () => apiClient.get<{ data: Location[] }>('/api/locations/'),
  })
}

export function useLocation(locationId: string) {
  return useQuery({
    queryKey: locationKeys.detail(locationId),
    queryFn: () => apiClient.get<{ data: Location }>(`/api/locations/${locationId}`),
    enabled: !!locationId,
  })
}

export function useCreateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Location) =>
      apiClient.post<{ data: Location }>('/api/locations/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() })
    },
  })
}

export function useUpdateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ locationId, data }: { locationId: string; data: Partial<Location> }) =>
      apiClient.put<{ data: Location }>(`/api/locations/${locationId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.all })
    },
  })
}

export function useDeleteLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (locationId: string) =>
      apiClient.delete(`/api/locations/${locationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.all })
    },
  })
}

export function useBulkDeleteLocations() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (locationIds: string[]) => apiClient.post('/api/locations/bulk_delete', { location_ids: locationIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.all })
    },
  })
}

export function useImportLocations() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const token = localStorage.getItem('access_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/locations/import`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })
      if (!response.ok) {
        const message = `Import failed: ${response.status} ${response.statusText}`
        try { (await import('../toast')).notifyToast(message, 'error') } catch {}
        throw new Error(message)
      }
      try { (await import('../toast')).notifyToast('Import completed successfully', 'success') } catch {}
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() })
    },
  })
}

export function useExportLocations() {
  return useMutation({
    mutationFn: async ({ format, location_ids = [], filters = '' }: { format: 'csv' | 'excel' | 'pdf'; location_ids?: string[]; filters?: string }) => {
      const token = localStorage.getItem('access_token')
      const formData = new FormData()
      formData.append('export_format', format)
      location_ids.forEach(id => formData.append('location_ids', id))
      if (filters) formData.append('filters', filters)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/locations/export`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })
      if (!response.ok) {
        const message = `Export failed: ${response.status} ${response.statusText}`
        try { (await import('../toast')).notifyToast(message, 'error') } catch {}
        throw new Error(message)
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `locations_export.${format === 'excel' ? 'xlsx' : format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      try { (await import('../toast')).notifyToast('Export started', 'success') } catch {}
      return 'Export completed successfully'
    },
  })
}