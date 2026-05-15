import { useQuery, useMutation } from '@tanstack/react-query';
import {
	getAllSubmissions,
	getSubmissions,
	createSubmission,
} from '../services/submissions.service';

export function useAllSubmissions() {
	return useQuery({
		queryKey: ['submissions'],
		queryFn: getAllSubmissions,
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}

export function useSubmissions() {
	return useQuery({
		queryKey: ['submissions'],
		queryFn: getSubmissions,
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}

export function createSubmissionsMutation() {
	return useMutation({
		mutationFn: createSubmission,
	});
}
