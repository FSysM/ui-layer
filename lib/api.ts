import axios from 'axios';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const api = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Only redirect authenticated users whose session has expired/failed.
      // Guests (no user in store) get 401s on protected endpoints — that's expected.
      const user = useAuthStore.getState().user;
      if (user) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
