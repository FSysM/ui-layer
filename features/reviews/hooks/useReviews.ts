import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createReview, updateReview, deleteReview } from '../services/reviews.service';

const SUBMISSIONS_KEY = ['submissions'];

export function useCreateReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY });
			toast.success('Review submitted');
		},
		onError: () => toast.error('Failed to submit review'),
	});
}

export function useUpdateReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY });
			toast.success('Review saved');
		},
		onError: () => toast.error('Failed to save review'),
	});
}

export function useDeleteReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SUBMISSIONS_KEY });
			toast.success('Review deleted');
		},
		onError: () => toast.error('Failed to delete review'),
	});
}
