import { useQuery } from '@tanstack/react-query';
import { getSubmissions } from '../services/submissions.service';

export function useSubmissions() {
	return useQuery({
		queryKey: ['submissions'],
		queryFn: getSubmissions,
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}
