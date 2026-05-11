import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/user.service';
import { useAuthStore } from '../store/auth.store';

export function useMe() {
	const user = useAuthStore((s) => s.user);
	const isGuest = useAuthStore((s) => s.isGuest);

	const query = useQuery({
		queryKey: ['me', user?.id ?? 'unauthenticated'],
		queryFn: getMe,
		staleTime: 1000 * 60 * 5, // 5 min cache
		enabled: !user && !isGuest,
	});

	if (user) {
		return {
			...query,
			data: user,
			isLoading: false,
			isSuccess: true,
			error: null,
		};
	}

	return query;
}
