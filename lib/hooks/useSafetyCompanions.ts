import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { UserProfile } from './useProfile'

export interface CompanionAvailability {
  companion_id: string
  day_of_week: string
  slots: TimeRange[]
}

export interface TimeRange {
  start: string
  end: string
}

export const companionKeys = {
  all: ['safety-companions'] as const,
  lists: () => [...companionKeys.all, 'list'] as const,
  list: (filters: string) => [...companionKeys.lists(), { filters }] as const,
  details: () => [...companionKeys.all, 'detail'] as const,
  detail: (id: string) => [...companionKeys.details(), id] as const,
  availability: (id: string) => [...companionKeys.all, 'availability', id] as const,
  byLocation: (locationId: string) => [...companionKeys.all, 'byLocation', locationId] as const,
}

export interface SafetyCompanionsResponse {
  data: UserProfile[]
  total?: number
  page?: number
  per_page?: number
  total_pages?: number
}

export function useSafetyCompanions(page = 1, offset = 10, filters?: string) {
  return useQuery({
    queryKey: [...companionKeys.lists(), { page, offset, filters: filters || '' }],
    queryFn: async (): Promise<SafetyCompanionsResponse> => {
      const endpoint = `/api/safety-companions/?page=${page}&offset=${offset}${filters ? `&filters=${filters}` : ''}`
      console.log('Fetching safety companions from:', endpoint)
      const response = await apiClient.get<any>(endpoint)
      console.log('Safety companions API response:', response)

      if (response && typeof response === 'object') {
        if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
          return {
            data: response.data.data,
            total: response.data.total,
            page: response.data.page,
            per_page: response.data.offset,
            total_pages: response.data.pages,
          }
        }
        if (Array.isArray(response.data)) {
          return { data: response.data }
        }
        if (Array.isArray(response)) {
          return { data: response }
        }
      }
      return { data: [] }
    },
    staleTime: 0,
    refetchOnMount: 'always',
  })
}

export function useCreateSafetyCompanion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserProfile & { password: string }) =>
      apiClient.post<{ data: UserProfile }>('/api/safety-companions/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companionKeys.lists() })
    },
  })
}

export function useUpdateSafetyCompanion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<UserProfile> }) =>
      apiClient.put<{ data: UserProfile }>(`/api/safety-companions/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companionKeys.all })
    },
  })
}

export function useDeleteSafetyCompanion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) =>
      apiClient.delete(`/api/safety-companions/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companionKeys.all })
    },
  })
}

export function useSafetyCompanionsByLocation(locationId: string) {
  return useQuery({
    queryKey: companionKeys.byLocation(locationId),
    queryFn: () => apiClient.get<{ data: UserProfile[] }>(`/api/safety-companions/by_location?location_id=${locationId}`),
    enabled: !!locationId,
  })
}

export function useSetCompanionAvailability() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ companionId, availabilities }: { companionId: string; availabilities: CompanionAvailability[] }) =>
      apiClient.post(`/api/companion-availability/${companionId}`, availabilities),
    onSuccess: (_, { companionId }) => {
      queryClient.invalidateQueries({ queryKey: companionKeys.availability(companionId) })
    },
  })
}

export function useCompanionAvailability(companionId: string) {
  return useQuery({
    queryKey: companionKeys.availability(companionId),
    queryFn: () => apiClient.get<{ data: CompanionAvailability[] }>(`/api/companion-availability/${companionId}`),
    enabled: !!companionId,
  })
}

export function useCompanionAvailabilitySlots(companionId: string) {
  return useQuery({
    queryKey: [...companionKeys.availability(companionId), 'slots'],
    queryFn: () => apiClient.get<{ data: any[] }>(`/api/companion-availability/${companionId}/slots`),
    enabled: !!companionId,
  })
}

// Bulk delete safety companions
export function useBulkDeleteSafetyCompanions() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userIds: string[]) => apiClient.post('/api/safety-companions/bulk_delete', { user_ids: userIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companionKeys.all })
    },
  })
}

// Import safety companions from file
export function useImportSafetyCompanions() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const token = localStorage.getItem('access_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/safety-companions/import`, {
        method: 'POST',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        body: formData,
      })
      if (!response.ok) {
        const { notifyToast } = await import('../toast')
        notifyToast(`Import failed: ${response.status} ${response.statusText}`, 'error')
        throw new Error('Import failed')
      }
      const { notifyToast } = await import('../toast')
      notifyToast('Import completed successfully', 'success')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companionKeys.lists() })
    },
  })
}

// Export safety companions
export function useExportSafetyCompanions() {
  return useMutation({
    mutationFn: async ({ format, user_ids = [], filters = '' }: { format: 'csv' | 'excel' | 'pdf'; user_ids?: string[]; filters?: string }) => {
      const token = localStorage.getItem('access_token')
      const formData = new FormData()
      formData.append('export_format', format)
      user_ids.forEach(id => formData.append('user_ids', id))
      if (filters) formData.append('filters', filters)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/safety-companions/export`, {
        method: 'POST',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        body: formData,
      })
      if (!response.ok) {
        const { notifyToast } = await import('../toast')
        notifyToast(`Export failed: ${response.status} ${response.statusText}`, 'error')
        throw new Error('Export failed')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `safety_companions_export.${format === 'excel' ? 'xlsx' : format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      const { notifyToast } = await import('../toast')
      notifyToast('Export started', 'success')
      return 'Export completed successfully'
    },
  })
}