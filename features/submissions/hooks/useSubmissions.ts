import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Submission created');
    },
    onError: () => toast.error('Failed to create submission'),
  });
}

export function useUpdateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Submission saved');
    },
    onError: () => toast.error('Failed to save submission'),
  });
}

export function useDeleteSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Submission deleted');
    },
    onError: () => toast.error('Failed to delete submission'),
  });
}

export function useApproveSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Submission approved');
    },
    onError: () => toast.error('Failed to approve submission'),
  });
}

export function useRejectSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Submission rejected');
    },
    onError: () => toast.error('Failed to reject submission'),
  });
}
