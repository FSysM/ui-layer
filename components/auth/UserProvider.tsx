'use client';

import { useRef } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import type { User } from '@/features/auth/types/auth.types';

interface Props {
  initialUser: User | null;
  children: React.ReactNode;
}

export function UserProvider({ initialUser, children }: Props) {
  const hydrated = useRef(false);

  // Populate Zustand synchronously on first render — before any child renders.
  // This prevents the flash: children that call useMe() find the store already filled.
  if (!hydrated.current) {
    hydrated.current = true;
    if (initialUser) {
      useAuthStore.setState({ user: initialUser, isGuest: false });
    }
  }

  return <>{children}</>;
}
