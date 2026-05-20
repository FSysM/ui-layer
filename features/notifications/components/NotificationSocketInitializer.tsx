'use client';

import { useNotificationSocket } from '../hooks/useNotificationSocket';

export function NotificationSocketInitializer() {
  useNotificationSocket();
  return null;
}
