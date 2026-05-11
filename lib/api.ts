import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

// Request interceptor: Add Authorization header
api.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token = sessionStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

// Response interceptor: Handle 401 with token refresh or redirect
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const original = error.config;
		const isAuthRoute = original.url?.includes('/auth/');
		const token =
			typeof window !== 'undefined'
				? sessionStorage.getItem('accessToken')
				: null;

		// Try refresh only if we have a token and haven't already retried
		if (
			error.response?.status === 401 &&
			!original._retry &&
			!isAuthRoute &&
			token
		) {
			original._retry = true;

			try {
				const { data } = await api.post('/auth/refresh');
				sessionStorage.setItem('accessToken', data.accessToken);
				original.headers.Authorization = `Bearer ${data.accessToken}`;
				return api(original);
			} catch {
				sessionStorage.removeItem('accessToken');
				window.location.href = '/login';
			}
		}

		return Promise.reject(error);
	},
);
