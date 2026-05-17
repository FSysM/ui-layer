import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useAssignments = () => {
	return useQuery<Assignments[]>({
		queryKey: QUERY_KEY,
		queryFn: getAssignments,
	});
};

export const useCreateAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
	});
};

export const useUpdateAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
	});
};

export const useDeleteAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
	});
};

export const usePickAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: pickAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
	});
};

export const useUnpickAssignment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: unpickAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
	});
};
