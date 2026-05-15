import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getAssignments,
	createAssignment,
	updateAssignment,
	deleteAssignment,
	pickAssignment,
	unpickAssignment,
} from '../services/assignments.service';

const QUERY_KEY = ['assignments'];

export function useAssignments() {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: QUERY_KEY,
		queryFn: getAssignments,
		staleTime: 1000 * 60 * 2,
	});

	const invalidate = () =>
		queryClient.invalidateQueries({ queryKey: QUERY_KEY });

	const create = useMutation({
		mutationFn: createAssignment,
		onSuccess: invalidate,
	});

	const update = useMutation({
		mutationFn: updateAssignment,
		onSuccess: invalidate,
	});

	const remove = useMutation({
		mutationFn: deleteAssignment,
		onSuccess: invalidate,
	});

	const pick = useMutation({
		mutationFn: pickAssignment,
		onSuccess: invalidate,
	});

	const unpick = useMutation({
		mutationFn: unpickAssignment,
		onSuccess: invalidate,
	});

	return {
		...query,

		create,
		update,
		remove,
		pick,
		unpick,
	};
}
