'use client';

import { Bell, Check, CheckCheck, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useUnreadCount } from '@/features/notifications/hooks/useUnreadCount';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from '@/features/notifications/hooks/useNotifications';
import type { Notification } from '@/features/notifications/types/notification.types';
import { cn } from '@/lib/utils';

export function NotificationDropdown() {
  const router = useRouter();
  const { data: unreadCount } = useUnreadCount();
  const { data: notifications = [] } = useNotifications();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();
  const { mutate: deleteNotif } = useDeleteNotification();

  const latest = (notifications as Notification[]).slice(0, 3);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {!!unreadCount && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end" sideOffset={8}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {!!unreadCount && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={(e) => { e.preventDefault(); markAllRead(); }}
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="divide-y max-h-72 overflow-y-auto">
          {latest.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No notifications
            </p>
          ) : (
            latest.map((n: Notification) => (
              <div
                key={n.id}
                className={cn(
                  'flex items-start gap-3 px-4 py-3',
                  !n.read && 'bg-accent/20'
                )}
              >
                <div
                  className={cn(
                    'mt-1.5 h-2 w-2 rounded-full shrink-0',
                    n.read ? 'bg-muted-foreground/30' : 'bg-primary'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!n.read && (
                    <button
                      className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => { e.preventDefault(); markRead(n.id); }}
                      title="Mark as read"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-destructive transition-colors"
                    onClick={(e) => { e.preventDefault(); deleteNotif(n.id); }}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => router.push('/dashboard/profile')}
          >
            Show more
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
