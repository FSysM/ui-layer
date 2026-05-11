import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle }  from "./header/ThemeToggle";
import { LanguageSelector } from "./header/LanguageSelector";
import { NotificationButton } from "./header/NotificationButton";
import { UserMenu } from "./header/UserMenu";
import { Button } from "@/components/ui/button";
import { useMe } from "@/features/auth/hooks/useMe";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  const { data: user } = useMe()

  const isGuest = user?.role === 'GUEST'
  const isAuthenticated = user && !isGuest

  return (
    <header
      className={`sticky top-0 z-30 flex w-full h-14 items-center justify-between border-b bg-card px-2 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-3 px-2">
        <ThemeToggle />
        <LanguageSelector />
        <NotificationButton />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Button onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

