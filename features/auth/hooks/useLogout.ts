import { useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { useAuthStore } from '../store/auth.store';

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return useCallback(() => {
    logout();
    signOut({ callbackUrl: '/login' });
  }, [logout]);
}
