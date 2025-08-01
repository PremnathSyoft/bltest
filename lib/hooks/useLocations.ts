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