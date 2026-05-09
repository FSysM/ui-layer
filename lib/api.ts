import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL,
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth-storage')
  if (authData) {
    try {
      const { state } = JSON.parse(authData)
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
    } catch (error) {
      console.error('Error parsing auth data:', error)
    }
  }
  return config
})