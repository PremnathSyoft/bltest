import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export interface SignupData {
  first_name: string
  last_name: string
  date_of_birth: string
  mobile_number: string
  email: string
  password: string
  profile_pic?: string
  price_per_hour?: number
  terms_accepted?: boolean
  location_ids?: string[]
  driving_license_number?: string
  driving_license_image?: string
  address_proof_image?: string
}

export interface SigninData {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: any
}

export function useSignup(userType: string) {
  return useMutation({
    mutationFn: (data: SignupData) =>
      apiClient.post<AuthResponse>(`/api/signup/${userType}`, data),
  })
}

export function useSignin(userType: string) {
  return useMutation({
    mutationFn: (data: SigninData) =>
      apiClient.post<AuthResponse>(`/api/signin/${userType}`, data),
  })
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (refreshToken: string) =>
      apiClient.post<AuthResponse>('/api/refresh_token', refreshToken),
  })
}

export function useEmailCheck(userType: string) {
  return useMutation({
    mutationFn: (email: string) =>
      apiClient.get(`/api/email_check/${userType}?email=${email}`),
  })
}