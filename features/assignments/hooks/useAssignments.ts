import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	getAssignments,
	createAssignment,
	updateAssignment,
	deleteAssignment,
	pickAssignment,
	unpickAssignment,
} from '../services/assignments.service';
import type { Assignments } from '../types/assignments.types';

const QUERY_KEY = ['assignments'];

export const useAssignments = (filter?: string) => {
	return useQuery<Assignments[]>({
		queryKey: [...QUERY_KEY, filter],
		queryFn: () => getAssignments(filter),
	});
};

export const useCreateAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			toast.success('Assignment created');
		},
		onError: () => toast.error('Failed to create assignment'),
	});
};

export const useUpdateAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			toast.success('Assignment saved');
		},
		onError: () => toast.error('Failed to save assignment'),
	});
};

export const useDeleteAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			toast.success('Assignment deleted');
		},
		onError: () => toast.error('Failed to delete assignment'),
	});
};

export const usePickAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: pickAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			toast.success('Assignment picked');
		},
		onError: () => toast.error('Failed to pick assignment'),
	});
};

export const useUnpickAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: unpickAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			toast.success('Assignment unpicked');
		},
		onError: () => toast.error('Failed to unpick assignment'),
	});
};
