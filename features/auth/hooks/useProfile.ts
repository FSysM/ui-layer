import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateProfile } from '../services/user.service';
import type { FullUser } from '../types/auth.types';

const QUERY_KEY = ['profile'];

export function useProfile() {
  return useQuery<FullUser>({
    queryKey: QUERY_KEY,
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
