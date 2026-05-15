import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getAllSubmissions,
	getSubmissions,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} from '../services/submissions.service';

const QUERY_KEY = ['submissions'];
const ALL_QUERY_KEY = ['submissions-all'];

export function useSubmissions(all = false) {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: all ? ALL_QUERY_KEY : QUERY_KEY,
		queryFn: all ? getAllSubmissions : getSubmissions,
		staleTime: 1000 * 60 * 2,
	});

	const invalidate = () =>
		queryClient.invalidateQueries({ queryKey: QUERY_KEY });

	const create = useMutation({
		mutationFn: createSubmission,
		onSuccess: invalidate,
	});

	const update = useMutation({
		mutationFn: updateSubmission,
		onSuccess: invalidate,
	});

	const remove = useMutation({
		mutationFn: deleteSubmission,
		onSuccess: invalidate,
	});

	return {
		...query,

		create,
		update,
		remove,
	};
}
