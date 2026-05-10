import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import { api } from '@/lib/api';

export function useLogout() {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);

	return useCallback(async () => {
		await api.post('/auth/logout').catch(() => {});
		logout();
		router.push('/login');
	}, [logout, router]);
}
