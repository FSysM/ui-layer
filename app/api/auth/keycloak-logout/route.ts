import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  const base = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  const params = new URLSearchParams({
    post_logout_redirect_uri: `${base}/login`,
    client_id: process.env.AUTH_KEYCLOAK_ID!,
  });

  if (session?.idToken) {
    params.set('id_token_hint', session.idToken);
  }

  const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params}`;
  return NextResponse.json({ url });
}
