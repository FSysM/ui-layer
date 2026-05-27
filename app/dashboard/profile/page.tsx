'use client';

import { useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, CheckCheck, Trash2, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile, useUpdateProfile } from '@/features/auth/hooks/useProfile';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from '@/features/notifications/hooks/useNotifications';
import type { Notification } from '@/features/notifications/types/notification.types';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/layout/PageHeader';

export default function ProfilePage() {
  const { data: user, isLoading } = useProfile();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();
  const { data: notifications = [] } = useNotifications();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();
  const { mutate: deleteNotif } = useDeleteNotification();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [initialized, setInitialized] = useState(false);
  if (user && !initialized) {
    setForm({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      address: user.address ?? '',
    });
    setInitialized(true);
  }

  function handleField(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSave() {
    updateProfile(form, {
      onSuccess: () => toast.success('Profile saved'),
      onError: () => toast.error('Failed to save profile'),
    });
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2 MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      updateProfile({ profilePicture: base64 }, {
        onSuccess: () => toast.success('Profile picture updated'),
        onError: () => toast.error('Failed to update picture'),
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const unreadCount = (notifications as Notification[]).filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="p-6">
        <PageHeader title="Profile" />
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader title="Profile" />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — avatar + form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profilePicture ?? ''} alt="Profile picture" />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.[0]?.toUpperCase() ?? user?.username?.[0]?.toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="text-center">
                <p className="font-semibold">{user?.name ?? user?.username}</p>
                <p className="text-sm text-muted-foreground">{user?.role}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Display name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={user?.username ?? ''}
                  disabled
                  className="opacity-60"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  placeholder="+420 ..."
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => handleField('address', e.target.value)}
                  placeholder="Street, City"
                />
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? 'Saving…' : 'Save changes'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right — notifications */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {unreadCount} unread
                  </span>
                )}
              </CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => markAllRead()}>
                  <CheckCheck className="h-3.5 w-3.5 mr-1" />
                  Mark all read
                </Button>
              )}
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              {(notifications as Notification[]).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-12">
                  No notifications
                </p>
              ) : (
                <div className="divide-y max-h-150 overflow-y-auto">
                  {(notifications as Notification[]).map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'flex items-start gap-3 px-6 py-4 hover:bg-accent/30 transition-colors',
                        !n.read && 'bg-accent/10'
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
                            className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => markRead(n.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => deleteNotif(n.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
