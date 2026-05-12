import { useQuery, useMutation } from '@tanstack/react-query';
import {
	getAssignments,
	createAssignment,
} from '../services/assignments.service';

export function useAssignments() {
	return useQuery({
		queryKey: ['assignments'],
		queryFn: getAssignments,
		staleTime: 1000 * 60 * 2, // 2 min cache
	});
}

export function createAssignmentMutation() {
	return useMutation({
		mutationFn: createAssignment,
	});
}
