import { api } from '@/lib/api';

export async function getNotifications() {
  const res = await api.get('/notifications');
  return res.data;
}

export async function markNotificationRead(id: string) {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
}

export async function markAllNotificationsRead() {
  const res = await api.patch('/notifications/read-all');
  return res.data;
}

export async function deleteNotification(id: string) {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
}
