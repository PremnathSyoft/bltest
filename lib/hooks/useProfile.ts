import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export interface UserProfile {
  id?: string
  first_name: string
  last_name: string
  date_of_birth: string
  mobile_number: string
  email: string
  profile_pic?: string
  role: 'SuperAdmin' | 'Admin' | 'SafetyCompanion' | 'Customer'
  price_per_hour?: number
  terms_accepted?: boolean
  location_ids?: string[]
  driving_license_number?: string
  driving_license_image?: string
  address_proof_image?: string
  verification_status?: string
  verification_notes?: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export interface UpdateProfileData {
  first_name?: string
  last_name?: string
  date_of_birth?: string
  mobile_number?: string
  email?: string
  profile_pic?: string
  price_per_hour?: number
  location_ids?: string[]
  driving_license_number?: string
  driving_license_image?: string
  address_proof_image?: string
}

export const profileKeys = {
  all: ['profile'] as const,
  detail: (id: string) => [...profileKeys.all, id] as const,
}

export function useCustomers(page = 1, offset = 10, filters?: string) {
  return useQuery({
    queryKey: [...profileKeys.all, 'customers', { page, offset, filters }],
    queryFn: () => apiClient.get<{ data: UserProfile[] }>(`/api/customers?page=${page}&offset=${offset}${filters ? `&filters=${filters}` : ''}`),
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserProfile & { password: string }) =>
      apiClient.post<{ data: UserProfile }>('/api/customers', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...profileKeys.all, 'customers'] })
    },
  })
}