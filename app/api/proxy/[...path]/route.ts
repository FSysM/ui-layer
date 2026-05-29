import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.BACKEND_URL ?? 'http://localhost:3003';

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  const { path } = await params;
  const url = `${BACKEND}/${path.join('/')}${request.nextUrl.search}`;

  const headers = new Headers();
  if (token?.accessToken) {
    headers.set('Authorization', `Bearer ${token.accessToken as string}`);
  }

  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  const body =
    request.method !== 'GET' && request.method !== 'HEAD'
      ? await request.arrayBuffer()
      : undefined;

  const upstream = await fetch(url, { method: request.method, headers, body });
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
