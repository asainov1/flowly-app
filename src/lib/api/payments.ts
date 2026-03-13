import { api } from "./client";
import type { Payment, Subscription } from "./types";

export const paymentsApi = {
  create: (data: {
    organization_id: number;
    amount: string;
    currency: string;
    provider: "stripe" | "yookassa";
    description?: string;
  }) => api.post<Payment>("/api/payments/payments/create", data),

  get: (paymentId: string) =>
    api.get<Payment>(`/api/payments/payments/${paymentId}`),

  createSubscription: (data: {
    organization_id: number;
    plan: string;
    billing_cycle: "monthly" | "yearly";
  }) => api.post<Subscription>("/api/payments/subscriptions", data),

  getSubscription: (id: string) =>
    api.get<Subscription>(`/api/payments/subscriptions/${id}`),

  cancelSubscription: (id: string) =>
    api.delete(`/api/payments/subscriptions/${id}`),
};
