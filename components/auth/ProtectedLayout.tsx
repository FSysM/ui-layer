'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isGuest = useAuthStore((s) => s.isGuest);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' && !isGuest) router.push('/login');
  }, [status, isGuest, router]);

  if (status === 'loading') return null;
  if (status === 'unauthenticated' && !isGuest) return null;

  return <>{children}</>;
}
