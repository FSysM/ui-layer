import axios from 'axios';

// All requests go through the Next.js BFF proxy.
// The proxy adds the Bearer token server-side — the browser never sees it.
export const api = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
