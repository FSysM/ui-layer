import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../services/reviews.service';

export function useReviews() {
	return useQuery({
		queryKey: ['reviews'],
		queryFn: getReviews,
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}
