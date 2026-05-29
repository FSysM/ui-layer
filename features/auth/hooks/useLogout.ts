import { useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { useAuthStore } from '../store/auth.store';

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const isGuest = useAuthStore((s) => s.isGuest);

  return useCallback(async () => {
    logout();

    if (isGuest) {
      window.location.href = '/login';
      return;
    }

    // Fetch the Keycloak end-session URL *before* clearing the NextAuth session
    // (auth() needs the session to get the id_token_hint)
    const { url } = await fetch('/api/auth/keycloak-logout')
      .then((r) => r.json())
      .catch(() => ({ url: '/login' }));

    await signOut({ redirect: false });
    window.location.href = url;
  }, [logout, isGuest]);
}
