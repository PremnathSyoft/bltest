import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

// Types based on your API schema
export interface Booking {
  id?: string
  customer_id: string
  companion_id: string
  slot_id: string
  date: string
  time: string
  driving_start_time?: string
  driving_end_time?: string
  total_duration_minutes?: number
  total_price: number
  coupon_code?: string
  paid_amount: number
  remarks?: string
  payment_status: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export interface CreateBookingData {
  customer_id: string
  companion_id: string
  slot_id: string
  date: string
  time: string
  total_price: number
  paid_amount: number
  payment_status: string
  coupon_code?: string
  remarks?: string
}

// Query keys
export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  list: (filters: string) => [...bookingKeys.lists(), { filters }] as const,
  details: () => [...bookingKeys.all, 'detail'] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
}

// Hooks
export function useBookings() {
  return useQuery({
    queryKey: bookingKeys.lists(),
    queryFn: () => apiClient.get<{ data: Booking[] }>('/api/bookings/'),
  })
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => apiClient.get<{ data: Booking }>(`/api/bookings/${id}`),
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBookingData) =>
      apiClient.post<{ data: Booking }>('/api/bookings/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() })
    },
  })
}

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateBookingData> }) =>
      apiClient.put<{ data: Booking }>(`/api/bookings/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
    },
  })
}

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/api/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
    },
  })
}

export function useBulkDeleteBookings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingIds: string[]) =>
      apiClient.post('/api/bookings/bulk_delete', { booking_ids: bookingIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
    },
  })
}