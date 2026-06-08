import { cache } from 'react';
import { auth } from '@/auth';
import { type User } from '@/features/auth/types/auth.types';

async function fetchUser(): Promise<User | null> {
  try {
    const session = await auth();
    if (!session?.accessToken) return null;

    const res = await fetch(`${process.env.USER_SERVICE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json() as Promise<User>;
  } catch {
    return null;
  }
}

// cache() deduplicates calls within the same request — layout + pages share one fetch
export const fetchCurrentUser = cache(fetchUser);
