import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle }  from "./header/ThemeToggle";
import { LanguageSelector } from "./header/LanguageSelector";
import { NotificationButton } from "./header/NotificationButton";
import { UserMenu } from "./header/UserMenu";

export default function Header() {
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
        <UserMenu />
      </div>
    </header>
  );
};

