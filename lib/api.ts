import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const original = error.config;

		const isAuthRoute = original.url?.includes('/auth/');

		if (error.response?.status === 401 && !original._retry && !isAuthRoute) {
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
