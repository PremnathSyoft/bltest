'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export interface Coupon {
  id?: string
  code: string
  discount_percent: number
  expires_at?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export const couponKeys = {
  all: ['coupons'] as const,
  lists: () => [...couponKeys.all, 'list'] as const,
  details: () => [...couponKeys.all, 'detail'] as const,
  detail: (id: string) => [...couponKeys.details(), id] as const,
}

export function useCoupons() {
  return useQuery({
    queryKey: couponKeys.lists(),
    queryFn: () => apiClient.get<{ data: Coupon[] }>('/api/coupons/'),
  })
}

export function useCoupon(id: string) {
  return useQuery({
    queryKey: couponKeys.detail(id),
    queryFn: () => apiClient.get<{ data: Coupon }>(`/api/coupons/${id}`),
    enabled: !!id,
  })
}

export function useCreateCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Coupon) => apiClient.post<{ data: Coupon }>('/api/coupons/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() })
    },
  })
}

export function useUpdateCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Coupon> }) => apiClient.put<{ data: Coupon }>(`/api/coupons/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all })
    },
  })
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/api/coupons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all })
    },
  })
}

export function useBulkDeleteCoupons() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (coupon_ids: string[]) => apiClient.post('/api/coupons/bulk_delete', { coupon_ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all })
    },
  })
}

export function useImportCoupons() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const token = localStorage.getItem('access_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/coupons/import`, {
        method: 'POST',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        body: formData,
      })
      if (!response.ok) {
        const msg = `Import failed: ${response.status} ${response.statusText}`
        try { (await import('../toast')).notifyToast(msg, 'error') } catch {}
        throw new Error(msg)
      }
      try { (await import('../toast')).notifyToast('Import completed successfully', 'success') } catch {}
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() })
    },
  })
}

export function useExportCoupons() {
  return useMutation({
    mutationFn: async ({ format, coupon_ids = [], filters = '' }: { format: 'csv' | 'excel' | 'pdf'; coupon_ids?: string[]; filters?: string }) => {
      const token = localStorage.getItem('access_token')
      const formData = new FormData()
      formData.append('export_format', format)
      coupon_ids.forEach(id => formData.append('coupon_ids', id))
      if (filters) formData.append('filters', filters)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/coupons/export`, {
        method: 'POST',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        body: formData,
      })
      if (!response.ok) {
        const msg = `Export failed: ${response.status} ${response.statusText}`
        try { (await import('../toast')).notifyToast(msg, 'error') } catch {}
        throw new Error(msg)
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `coupons_export.${format === 'excel' ? 'xlsx' : format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      try { (await import('../toast')).notifyToast('Export started', 'success') } catch {}
      return 'Export completed successfully'
    },
  })
}

export function useValidateCoupon() {
  return useMutation({
    mutationFn: (code: string) => apiClient.get<{ data: any }>(`/api/coupons/validate?code=${encodeURIComponent(code)}`),
  })
}

export function useCouponByCode() {
  return useMutation({
    mutationFn: (code: string) => apiClient.get<{ data: Coupon }>(`/api/coupons/by_code?code=${encodeURIComponent(code)}`),
  })
}


