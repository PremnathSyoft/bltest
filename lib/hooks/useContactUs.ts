import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export interface ContactUs {
  id?: string
  name: string
  email: string
  message: string
  status?: string
  responses?: string
  created_at?: string
  updated_at?: string
}

export interface ContactUsCreate {
  name: string
  email: string
  message: string
  responses?: string
}

export const contactKeys = {
  all: ['contact-us'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
}

export function useCreateContactUs() {
  return useMutation({
    mutationFn: (data: ContactUsCreate) =>
      apiClient.post<{ data: ContactUs }>('/api/contact-us', data),
  })
}

export function useContactUsList(page = 1, offset = 10, filters?: string) {
  return useQuery({
    queryKey: [...contactKeys.lists(), { page, offset, filters }],
    queryFn: () => apiClient.get<{ data: ContactUs[] }>(`/api/contact-us?page=${page}&offset=${offset}${filters ? `&filters=${filters}` : ''}`),
  })
}

export function useBulkDeleteContacts() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contactIds: string[]) =>
      apiClient.delete('/api/contact-us/bulk', { contact_ids: contactIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all })
    },
  })
}