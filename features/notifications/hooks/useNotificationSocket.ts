'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from '../services/notification-socket.service';
import type { NotificationData } from '../types/notification.types';

function showToast(data: NotificationData) {
  if (data.type.includes('APPROVED')) {
    toast.success(data.message);
  } else if (
    data.type.includes('REJECTED') ||
    data.type.includes('DELETED')
  ) {
    toast.error(data.message);
  } else {
    toast.info(data.message);
  }
}

export function useNotificationSocket() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  useEffect(() => {
    const token = session?.accessToken;
    if (!token) return;

    const socket = connectNotificationSocket(token);

    socket.on('connect', () => {
      console.log('[notifications] socket connected, id:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('[notifications] socket connection error:', err.message);
    });

    socket.on('notification', (data: NotificationData) => {
      showToast(data);
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('notification');
      disconnectNotificationSocket();
    };
  }, [queryClient, session?.accessToken]);
}
