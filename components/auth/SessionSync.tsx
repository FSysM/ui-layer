'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { api } from '@/lib/api';

export function SessionSync() {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  // Set token synchronously so the axios interceptor has it before any query fires
  if (typeof window !== 'undefined' && session?.accessToken) {
    sessionStorage.setItem('accessToken', session.accessToken);
  }

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.accessToken && !user) {
      api.get('/auth/me').then((res) => {
        setAuth(res.data, session.accessToken!);
      }).catch(() => {});
    }

    if (status === 'unauthenticated') {
      sessionStorage.removeItem('accessToken');
      logout();
    }
  }, [session?.accessToken, status]);

  return null;
}
