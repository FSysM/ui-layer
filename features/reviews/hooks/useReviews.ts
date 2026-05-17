import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview, updateReview, deleteReview } from '../services/reviews.service';

const SUBMISSIONS_KEY = ['submissions'];

export function useCreateReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReview,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY }),
	});
}

export function useUpdateReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateReview,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY }),
	});
}

export function useDeleteReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReview,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY }),
	});
}
