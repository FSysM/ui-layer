'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const setGuest = useAuthStore((s) => s.setGuest);
  const router = useRouter();

  function handleContinueAsGuest() {
    setGuest();
    router.push('/dashboard/home');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>FSysM</CardTitle>
          <CardDescription>Login to the app</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() => signIn('keycloak', { callbackUrl: '/dashboard/home' })}
          >
            Login with Keycloak
          </Button>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleContinueAsGuest}
          >
            Continue as a guest
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
