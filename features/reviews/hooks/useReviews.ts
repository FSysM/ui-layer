import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getReviews,
	createReview,
	updateReview,
	deleteReview,
} from '../services/reviews.service';

const QUERY_KEY = ['reviews'];
const SUBMISSIONS_KEY = ['submissions'];

export function useReviews() {
	return useQuery({ queryKey: QUERY_KEY, queryFn: getReviews });
}

export function useCreateReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY });
		},
	});
}

export function useUpdateReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY });
		},
	});
}

export function useDeleteReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY });
		},
	});
}
