'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle }  from "./header/ThemeToggle";
import { NotificationDropdown } from "./header/NotificationDropdown";
import { UserMenu } from "./header/UserMenu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { User } from "@/features/auth/types/auth.types";

export default function Header({ user }: { user: User | null }) {
  const router = useRouter()

  const isAuthenticated = !!user

  return (
    <header
      className={`sticky top-0 z-30 flex w-full h-14 items-center justify-between border-b bg-card px-2 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-3 px-2">
        <ThemeToggle />
        {isAuthenticated && <NotificationDropdown />}
        {isAuthenticated ? (
          <UserMenu user={user} />
        ) : (
          <Button onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

