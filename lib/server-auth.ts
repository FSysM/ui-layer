import { cache } from 'react';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { type User } from '@/features/auth/types/auth.types';

async function getServerToken() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const req = new Request('http://localhost', {
    headers: { cookie: cookieHeader },
  });

  return getToken({ req, secret: process.env.AUTH_SECRET });
}

async function fetchUser(): Promise<User | null> {
  try {
    const token = await getServerToken();
    if (!token?.accessToken) return null;

    const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token.accessToken as string}` },
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
