export type Notification = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  entityType?: string;
  entityId?: string;
  createdAt: string;
};

export type NotificationData = {
  type: string;
  message: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
};
