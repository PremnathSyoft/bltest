import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export interface PaymentData {
  user_id: string
  slot_id: string
  amount: number
  payment_method: string
  coupon_code?: string
  source?: string
}

export interface Payment {
  id: string
  user_id: string
  slot_id: string
  amount: number
  payment_method: string
  coupon_code?: string
  source?: string
  status: string
  created_at: string
  updated_at: string
}

export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  byUser: (userId: string) => [...paymentKeys.all, 'byUser', userId] as const,
}

export function useCreatePayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PaymentData) =>
      apiClient.post<{ data: Payment }>('/api/payments/charge', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all })
    },
  })
}

export function usePaymentsByUser(userId: string) {
  return useQuery({
    queryKey: paymentKeys.byUser(userId),
    queryFn: () => apiClient.get<{ data: Payment[] }>(`/api/payments/by_user?user_id=${userId}`),
    enabled: !!userId,
  })
}

export function useAllPayments() {
  return useQuery({
    queryKey: paymentKeys.lists(),
    queryFn: () => apiClient.get<{ data: Payment[] }>('/api/payments/all'),
  })
}

export function useBulkDeletePayments() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (paymentIds: string[]) =>
      apiClient.post('/api/payments/bulk_delete', { payment_ids: paymentIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all })
    },
  })
}