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

export function useSafetyCompanions(page = 1, offset = 10, filters?: string) {
  return useQuery({
    queryKey: companionKeys.list(filters || ''),
    queryFn: () => apiClient.get<{ data: UserProfile[] }>(`/api/safety-companions/?page=${page}&offset=${offset}${filters ? `&filters=${filters}` : ''}`),
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