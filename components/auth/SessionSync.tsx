'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { api } from '@/lib/api';

export function SessionSync() {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.error === 'RefreshTokenError') {
      logout();
      signOut({ callbackUrl: '/login' });
      return;
    }

    if (status === 'authenticated' && !user) {
      api.get('/auth/me').then((res) => {
        setAuth(res.data);
      }).catch(() => {});
    }

    if (status === 'unauthenticated') {
      logout();
    }
  }, [status, session?.error]);

  return null;
}
