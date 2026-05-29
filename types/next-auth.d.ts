import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    idToken?: string;  // Used server-side for Keycloak logout only
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;   // Server-side only — never exposed to browser
    refreshToken?: string;
    idToken?: string;
    expiresAt?: number;
    error?: string;
  }
}
