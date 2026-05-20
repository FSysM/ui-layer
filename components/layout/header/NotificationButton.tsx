'use client';

import { Bell } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUnreadCount } from '@/features/notifications/hooks/useUnreadCount';

export function NotificationButton() {
  const { data: unreadCount } = useUnreadCount();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="relative p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {!!unreadCount && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Notifications {!!unreadCount && `(${unreadCount})`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
