import { api } from '@/lib/api';
import { LoginRequest, LoginResponse } from '../types/auth.types';

export async function loginService(data: LoginRequest): Promise<LoginResponse> {
	const response = await api.post<LoginResponse>('/auth/login', data);
	return response.data;
}
