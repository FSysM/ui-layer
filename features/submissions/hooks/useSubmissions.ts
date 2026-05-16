import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getSubmissions,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} from '../services/submissions.service';

const QUERY_KEY = ['submissions'];

export function useSubmissions() {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: QUERY_KEY,
		queryFn: getSubmissions,
		staleTime: 1000 * 60 * 2,
	});

	const create = useMutation({
		mutationFn: createSubmission,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	});

	const update = useMutation({
		mutationFn: updateSubmission,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	});

	const remove = useMutation({
		mutationFn: deleteSubmission,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	});

	return { ...query, create, update, remove };
}
