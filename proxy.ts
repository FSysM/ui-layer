import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  if (request.cookies.has('guest-session')) {
    return NextResponse.next();
  }
  return auth(request as any);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
