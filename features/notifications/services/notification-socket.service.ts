import { io, Socket } from 'socket.io-client';

const WS_BASE = process.env.NEXT_PUBLIC_NOTIFICATION_URL
  ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3004');

let socket: Socket | null = null;

export function connectNotificationSocket(token: string): Socket {
  if (socket && !socket.disconnected) return socket;

  socket = io(`${WS_BASE}/notifications`, {
    auth: { token },
    transports: ['websocket'],
  });

  return socket;
}

export function disconnectNotificationSocket(): void {
  socket?.disconnect();
  socket = null;
}
