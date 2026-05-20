import { io, Socket } from 'socket.io-client';

const WS_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3003';

let socket: Socket | null = null;

export function connectNotificationSocket(token: string): Socket {
  if (socket?.connected) return socket;

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
