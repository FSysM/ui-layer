import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getMe } from '../services/user.service';
import { useAuthStore } from '../store/auth.store';

export function useMe() {
  const user = useAuthStore((s) => s.user);
  const { status } = useSession();

  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    // Only fire when there is an active session AND the user isn't loaded yet.
    // Guests (unauthenticated) never trigger this fetch.
    enabled: status === 'authenticated' && !user,
  });

  if (user) {
    return {
      ...query,
      data: user,
      isLoading: false,
      isSuccess: true,
      error: null,
    };
  }

  return query;
}
