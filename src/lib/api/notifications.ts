import { api } from "./client";
import type {
  Notification,
  NotificationSettings,
  UnreadCount,
  PaginatedResponse,
} from "./types";

export const notificationsApi = {
  list: (params?: {
    organization_id?: number;
    limit?: number;
    offset?: number;
    type?: string;
  }) => {
    const q = new URLSearchParams();
    if (params?.organization_id) q.set("organization_id", String(params.organization_id));
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.offset) q.set("offset", String(params.offset));
    if (params?.type) q.set("type", params.type);
    return api.get<PaginatedResponse<Notification>>(`/api/notifications/notifications?${q}`);
  },

  unreadCount: (orgId?: number) => {
    const q = orgId ? `?organization_id=${orgId}` : "";
    return api.get<UnreadCount>(`/api/notifications/notifications/unread-count${q}`);
  },

  markRead: (id: string) =>
    api.patch<Notification>(`/api/notifications/notifications/${id}`, { is_read: true }),

  markUnread: (id: string) =>
    api.patch<Notification>(`/api/notifications/notifications/${id}`, { is_read: false }),

  delete: (id: string) =>
    api.delete(`/api/notifications/notifications/${id}`),

  create: (data: {
    organization_id: number;
    agent_id?: string;
    type: string;
    title: string;
    description: string;
  }) => api.post<Notification>("/api/notifications/message/notification", data),

  getSettings: (orgId: number) =>
    api.get<NotificationSettings>(
      `/api/notifications/organizations/${orgId}/notification-settings`
    ),

  updateSettings: (orgId: number, data: Partial<NotificationSettings>) =>
    api.patch<NotificationSettings>(
      `/api/notifications/organizations/${orgId}/notification-settings`,
      data
    ),

  linkTelegram: () =>
    api.post<{ link_url: string }>("/api/notifications/telegram/link"),

  unlinkTelegram: () =>
    api.delete("/api/notifications/telegram/unlink"),

  centrifugoToken: (orgId: number) =>
    api.post<{ token: string }>(
      "/api/notifications/centrifugo/subscription-token",
      { organization_id: orgId }
    ),
};
