import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // Ask NextAuth for the current (possibly refreshed) token
        const session = await fetch('/api/auth/session').then((r) => r.json());
        if (session?.accessToken) {
          sessionStorage.setItem('accessToken', session.accessToken);
          original.headers.Authorization = `Bearer ${session.accessToken}`;
          return api(original);
        }
      } catch {}

      if (typeof window !== 'undefined') window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
