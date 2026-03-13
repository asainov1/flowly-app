"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, MessageSquare, MessagesSquare, Wallet, Plus, CreditCard } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/lib/providers/AuthProvider";
import { analyticsApi, notificationsApi } from "@/lib/api";
import type { Notification } from "@/lib/api";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    agents: 0,
    messages: 0,
    dialogues: 0,
    balance: "0",
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    const orgId = user.organization_ids?.[0];
    if (!orgId) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const summary = await analyticsApi.summaries(orgId);
        setStats((s) => ({
          ...s,
          messages: summary.total_messages,
          dialogues: summary.total_dialogues,
        }));
      } catch {}

      try {
        const notifs = await notificationsApi.list({
          organization_id: orgId,
          limit: 5,
        });
        setNotifications(notifs.results);
      } catch {}

      setLoading(false);
    };

    load();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
        <Skeleton variant="chart" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Дашборд</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Добро пожаловать, {user?.first_name || user?.email.split("@")[0]}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Bot className="h-5 w-5" />}
          label="Агенты"
          value={stats.agents}
        />
        <StatCard
          icon={<MessageSquare className="h-5 w-5" />}
          label="Сообщения"
          value={stats.messages}
        />
        <StatCard
          icon={<MessagesSquare className="h-5 w-5" />}
          label="Диалоги"
          value={stats.dialogues}
        />
        <StatCard
          icon={<Wallet className="h-5 w-5" />}
          label="Баланс"
          value={`${stats.balance} ₸`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Быстрые действия" className="lg:col-span-1">
          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push("/agents/new")}
            >
              <Plus className="h-4 w-4" />
              Создать агента
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/billing")}
            >
              <CreditCard className="h-4 w-4" />
              Пополнить баланс
            </Button>
          </div>
        </Card>

        <Card title="Последние уведомления" className="lg:col-span-2">
          {notifications.length === 0 ? (
            <p className="text-sm text-zinc-500">Нет уведомлений</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]"
                >
                  <div
                    className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      n.is_read ? "bg-zinc-600" : "bg-violet-500"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5 truncate">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
