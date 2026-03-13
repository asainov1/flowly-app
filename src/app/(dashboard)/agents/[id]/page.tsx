"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Bot,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tabs = ["Обзор", "Чат", "Аналитика", "Настройки"];

// Mock data
const mockAgent = {
  id: "1",
  name: "Менеджер продаж",
  type: "chatbot",
  status: "active" as const,
  model: "gpt-4o",
  description: "AI-менеджер для автоматизации продаж",
  created_at: "2025-12-01T00:00:00Z",
  total_messages: 1243,
  total_dialogues: 89,
};

const mockChartData = Array.from({ length: 14 }, (_, i) => ({
  date: `${i + 1}.03`,
  count: Math.floor(Math.random() * 80) + 20,
}));

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Обзор");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");

  const [editName, setEditName] = useState(mockAgent.name);
  const [editDescription, setEditDescription] = useState(mockAgent.description);
  const [editInstructions, setEditInstructions] = useState("");

  const agent = mockAgent;

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: chatInput },
      {
        role: "assistant",
        content:
          "Это тестовый ответ агента. SSE-стриминг будет подключён позже.",
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/agents")}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-zinc-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
            <Badge variant="success">Активен</Badge>
          </div>
          <p className="text-sm text-zinc-500 mt-0.5">{agent.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "text-violet-400 border-violet-600"
                : "text-zinc-500 border-transparent hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "Обзор" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<Bot className="h-5 w-5" />}
              label="Сообщения"
              value={agent.total_messages}
            />
            <StatCard
              icon={<Bot className="h-5 w-5" />}
              label="Диалоги"
              value={agent.total_dialogues}
            />
            <StatCard
              icon={<Bot className="h-5 w-5" />}
              label="Модель"
              value={agent.model}
            />
          </div>
          <Card title="Информация">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Тип</span>
                <span className="text-white">{agent.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Создан</span>
                <span className="text-white">
                  {new Date(agent.created_at).toLocaleDateString("ru-RU")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ID</span>
                <span className="text-zinc-400 font-mono text-xs">
                  {params.id}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === "Чат" && (
        <Card className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatMessages.length === 0 && (
              <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                Начните диалог с агентом
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-lg bg-violet-600/20 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-violet-400" />
                  </div>
                )}
                <div
                  className={`max-w-md px-4 py-2.5 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-white/5 text-zinc-300"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-zinc-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Введите сообщение..."
              className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600/50"
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Analytics Tab */}
      {activeTab === "Аналитика" && (
        <Card title="Сообщения по дням">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  fill="rgba(139,92,246,0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Settings Tab */}
      {activeTab === "Настройки" && (
        <Card>
          <div className="space-y-5">
            <Input
              label="Имя агента"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              label="Описание"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-400">
                Инструкции
              </label>
              <textarea
                rows={5}
                value={editInstructions}
                onChange={(e) => setEditInstructions(e.target.value)}
                placeholder="Инструкции для агента..."
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600/50 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="danger">Удалить агента</Button>
              <Button>Сохранить</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
