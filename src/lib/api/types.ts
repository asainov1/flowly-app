// ===================== AUTH =====================
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  email_verified: boolean;
  locale: string;
  timezone: string;
  theme: string;
  date_joined: string;
  last_login: string | null;
  organization_ids: number[];
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  user: User;
}

// ===================== ANALYTICS =====================
export interface AnalyticsSummary {
  total_messages: number;
  total_dialogues: number;
  total_function_calls: number;
  avg_processing_time: number;
  conversion_rate: number;
}

export interface HistogramPoint {
  timestamp: string;
  count: number;
}

export interface HistogramData {
  data: HistogramPoint[];
  start_date: string;
  end_date: string;
  step: number;
}

export interface ConversionRate {
  rate: number;
  total_calls: number;
  successful_calls: number;
}

// ===================== BILLING =====================
export interface Transaction {
  id: string;
  organization_id: number;
  type: "real" | "bonus";
  purpose: "income" | "expense";
  source: "card" | "bank" | "manual" | "system" | "balance";
  amount: string;
  description: string;
  data: Record<string, unknown>;
  created_at: string;
}

export interface OrganizationBalance {
  organization_id: number;
  balance: string;
}

export interface AutoReplenishment {
  id: string;
  organization_id: number;
  is_enabled: boolean;
  replenishment_amount: string;
  balance_threshold: string;
}

export interface TokenUsage {
  id: string;
  organization_id: number;
  agent_id: string | null;
  model: string;
  input_tokens: number;
  output_tokens: number;
  created_at: string;
}

export interface TokenUsageTotal {
  total_input_tokens: number;
  total_output_tokens: number;
}

export interface TokenUsageGrouped {
  model: string;
  date: string;
  input_tokens: number;
  output_tokens: number;
}

// ===================== NOTIFICATIONS =====================
export interface Notification {
  id: string;
  organization_id: number;
  agent_id: string | null;
  type: string;
  title: string;
  description: string;
  is_read: boolean;
  data: Record<string, unknown>;
  created_at: string;
}

export interface NotificationSettings {
  organization_id: number;
  agent_id: string | null;
  function_errors: boolean;
  channel_disconnection: boolean;
  integration_disconnection: boolean;
  tokens: boolean;
  subscriptions: boolean;
  balance: boolean;
  email_enabled: boolean;
  telegram_enabled: boolean;
}

export interface UnreadCount {
  count: number;
}

// ===================== PAYMENT =====================
export interface Payment {
  id: string;
  payment_id: string;
  organization_id: number;
  agent_id: string | null;
  provider: "stripe" | "yookassa";
  amount: string;
  currency: "RUB" | "USD" | "KZT";
  status: "pending" | "paid" | "failed";
  created_at: string;
}

export interface Subscription {
  id: string;
  organization_id: number;
  plan: string;
  billing_cycle: "monthly" | "yearly";
  status: "active" | "cancelled";
  current_period_end: string;
  created_at: string;
}

// ===================== AGENTS =====================
export interface Agent {
  id: string;
  name: string;
  type: string;
  organization_id: number;
  status: "active" | "paused" | "draft";
  model: string;
  description: string;
  created_at: string;
  updated_at: string;
  total_messages: number;
  total_dialogues: number;
}

// ===================== PAGINATION =====================
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
