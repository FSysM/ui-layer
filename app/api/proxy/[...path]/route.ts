import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.BACKEND_URL ?? 'http://localhost:3003';
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3004';
const USER_SERVICE = process.env.USER_SERVICE_URL ?? 'http://localhost:3006';

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const session = await auth();

  const { path } = await params;
  const baseUrl =
    path[0] === 'notifications' ? NOTIFICATION_SERVICE :
    path[0] === 'auth' || path[0] === 'users' ? USER_SERVICE :
    BACKEND;
  const url = `${baseUrl}/${path.join('/')}${request.nextUrl.search}`;

  const headers = new Headers();
  if (session?.accessToken) {
    headers.set('Authorization', `Bearer ${session.accessToken as string}`);
  }

  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  const body =
    request.method !== 'GET' && request.method !== 'HEAD'
      ? await request.arrayBuffer()
      : undefined;

  const upstream = await fetch(url, { method: request.method, headers, body });

  if (upstream.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await upstream.json().catch(() => null);

  return NextResponse.json(data, { status: upstream.status });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
