import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Sidepanel } from '@/components/layout/Sidepanel';
import { GlobalConfirmDialog } from '@/components/confirm-dialog/GlobalConfirmDialog';
import { Toaster } from 'sonner';
import { NotificationSocketInitializer } from '@/features/notifications/components/NotificationSocketInitializer';
import { UserProvider } from '@/components/auth/UserProvider';
import { fetchCurrentUser } from '@/lib/server-auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await fetchCurrentUser();

  return (
    <UserProvider initialUser={user}>
      <SidebarProvider>
        <Sidepanel user={user} />
        <SidebarInset>
          <Header user={user} />
          <main className="min-h-screen w-full p-[clamp(0.5rem,2vw,2rem)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <NotificationSocketInitializer />
      <Toaster />
      <GlobalConfirmDialog />
    </UserProvider>
  );
}
