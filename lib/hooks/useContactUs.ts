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

export interface ContactUsListResponse {
  data: ContactUs[]
  total?: number
  page?: number
  per_page?: number
  total_pages?: number
}

export function useContactUsList(page = 1, offset = 10, filters?: string) {
  return useQuery({
    queryKey: [...contactKeys.lists(), { page, offset, filters }],
    queryFn: async (): Promise<ContactUsListResponse> => {
      const endpoint = `/api/contact-us?page=${page}&offset=${offset}${filters ? `&filters=${filters}` : ''}`
      console.log('Fetching contact-us from:', endpoint)
      const response = await apiClient.get<any>(endpoint)
      console.log('Contact-us API response:', response)

      // Normalize backend structure: { status, message, data: { total, page, offset, data, pages } }
      if (response && typeof response === 'object' && response.status === 200 && response.data && Array.isArray(response.data.data)) {
        return {
          data: response.data.data,
          total: response.data.total,
          page: response.data.page,
          per_page: response.data.offset,
          total_pages: response.data.pages,
        }
      }
      // Fallbacks
      if (Array.isArray(response?.data)) {
        return { data: response.data }
      }
      if (Array.isArray(response)) {
        return { data: response }
      }
      return { data: [] }
    },
    staleTime: 0,
    refetchOnMount: 'always',
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