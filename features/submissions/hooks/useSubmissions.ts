import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllSubmissions,
  getSubmissions,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  approveSubmission,
  rejectSubmission,
} from '../services/submissions.service';

const QUERY_KEY = ['submissions'];
const ALL_QUERY_KEY = ['submissions', 'all'];

export function useSubmissions() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: getSubmissions });
}

export function useAllSubmissions() {
  return useQuery({ queryKey: ALL_QUERY_KEY, queryFn: getAllSubmissions });
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

export function useApproveSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveSubmission,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useRejectSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectSubmission,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
