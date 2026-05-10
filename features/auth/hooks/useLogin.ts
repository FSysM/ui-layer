import { useMutation } from '@tanstack/react-query';
import { loginService } from '../services/login.service';
import { useAuthStore } from '../store/auth.store';
import { useRouter } from 'next/navigation';

export function useLogin() {
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);

	return useMutation({
		mutationFn: loginService,
		onSuccess: (data) => {
			setAuth(data.user, data.accessToken);
			router.push('/dashboard/home');
		},
	});
}
