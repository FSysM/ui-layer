import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../services/reviews.service';

export function useReviews() {
	return useQuery({
		queryKey: ['reviews'],
		queryFn: getReviews,
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}

export function useReview(id: string) {
	return useQuery({
		queryKey: ['reviews', id],
		queryFn: () =>
			getReviews().then((reviews) => reviews.find((r) => r.id === id)),
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}
