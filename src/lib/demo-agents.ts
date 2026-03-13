import type { Agent } from "@/lib/api/types";

const STORAGE_KEY = "flowly_demo_agents";

const defaultAgents: Agent[] = [
  {
    id: "a1b2c3d4",
    name: "Маркетолог — ИП Алиев",
    type: "Маркетолог",
    organization_id: 1,
    status: "active",
    model: "GPT-4o",
    description: "Создаёт контент-планы, пишет посты для Instagram и Telegram",
    created_at: "2025-12-01T10:00:00Z",
    updated_at: "2026-03-10T14:30:00Z",
    total_messages: 1847,
    total_dialogues: 234,
  },
  {
    id: "e5f6g7h8",
    name: "HR-рекрутер — TechCorp",
    type: "HR",
    organization_id: 1,
    status: "active",
    model: "Claude 3.5 Sonnet",
    description: "Скринит резюме, проводит первичные интервью, назначает встречи",
    created_at: "2026-01-15T09:00:00Z",
    updated_at: "2026-03-12T11:00:00Z",
    total_messages: 892,
    total_dialogues: 156,
  },
  {
    id: "i9j0k1l2",
    name: "Голосовой — Клиника Аль-Фараби",
    type: "Голосовой",
    organization_id: 1,
    status: "paused",
    model: "GPT-4o",
    description: "Принимает звонки, записывает на приём, отвечает на вопросы",
    created_at: "2026-02-10T08:00:00Z",
    updated_at: "2026-03-08T16:00:00Z",
    total_messages: 421,
    total_dialogues: 89,
  },
  {
    id: "m3n4o5p6",
    name: "Чат-бот — Kaspi Магазин",
    type: "Чат-бот",
    organization_id: 1,
    status: "active",
    model: "GPT-4o-mini",
    description: "Отвечает на вопросы покупателей, помогает с заказами",
    created_at: "2026-02-20T12:00:00Z",
    updated_at: "2026-03-13T09:00:00Z",
    total_messages: 3241,
    total_dialogues: 567,
  },
  {
    id: "q7r8s9t0",
    name: "Аналитик — DataFlow",
    type: "Аналитика",
    organization_id: 1,
    status: "draft",
    model: "Claude 3.5 Sonnet",
    description: "Анализирует данные, строит отчёты, находит инсайты",
    created_at: "2026-03-10T15:00:00Z",
    updated_at: "2026-03-10T15:00:00Z",
    total_messages: 0,
    total_dialogues: 0,
  },
  {
    id: "u1v2w3x4",
    name: "Браузерный — Мониторинг цен",
    type: "Браузерный",
    organization_id: 1,
    status: "active",
    model: "GPT-4o",
    description: "Мониторит цены конкурентов, собирает данные с сайтов",
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-13T07:00:00Z",
    total_messages: 156,
    total_dialogues: 42,
  },
];

export function getDemoAgents(): Agent[] {
  if (typeof window === "undefined") return defaultAgents;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultAgents;
    }
  }
  return defaultAgents;
}

export function addDemoAgent(agent: Agent): void {
  const agents = getDemoAgents();
  agents.unshift(agent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
}

const typeNameMap: Record<string, string> = {
  chatbot: "Чат-бот",
  marketer: "Маркетолог",
  hr: "HR",
  browser: "Браузерный",
  voice: "Голосовой",
  analytics: "Аналитика",
};

export function getTypeName(typeId: string): string {
  return typeNameMap[typeId] || typeId;
}
