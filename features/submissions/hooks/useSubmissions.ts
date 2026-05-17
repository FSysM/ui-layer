import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getSubmissions,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} from '../services/submissions.service';

const QUERY_KEY = ['submissions'];

export function useSubmissions() {
	return useQuery({
		queryKey: QUERY_KEY,
		queryFn: getSubmissions,
	});
}

export function useCreateSubmission() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createSubmission,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	});
}

export function useUpdateSubmission() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateSubmission,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	});
}

export function useDeleteSubmission() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteSubmission,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	});
}
