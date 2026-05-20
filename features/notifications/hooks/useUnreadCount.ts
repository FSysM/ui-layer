import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useUnreadCount() {
	return useQuery({
		queryKey: ['notifications', 'unreadCount'],
		queryFn: async () => {
			const { data } = await api.get<number>('/notifications/unread-count');
			return data;
		},
		staleTime: 30_000,
	});
}
