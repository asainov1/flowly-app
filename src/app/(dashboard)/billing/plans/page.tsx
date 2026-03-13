"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "Бесплатно",
    priceNote: null,
    features: [
      "1 AI-агент",
      "1 000 сообщений/мес",
      "Базовая аналитика",
      "Email-уведомления",
    ],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "29 900 ₸",
    priceNote: "/мес",
    features: [
      "10 AI-агентов",
      "50 000 сообщений/мес",
      "Расширенная аналитика",
      "Telegram-уведомления",
      "API-доступ",
      "Приоритетная поддержка",
    ],
    current: false,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "По запросу",
    priceNote: null,
    features: [
      "Безлимитные агенты",
      "Безлимитные сообщения",
      "Кастомные модели",
      "SLA 99.9%",
      "Выделенный менеджер",
      "On-premise развёртывание",
    ],
    current: false,
  },
];

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Тарифные планы</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Выберите план, подходящий для вашего бизнеса
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass rounded-xl p-6 flex flex-col ${
              plan.popular ? "ring-2 ring-violet-600" : ""
            } ${plan.current ? "bg-violet-600/5" : ""}`}
          >
            {plan.popular && (
              <span className="text-xs font-medium text-violet-400 mb-2">
                Популярный
              </span>
            )}
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
            <div className="mt-3 mb-6">
              <span className="text-3xl font-bold text-white">
                {plan.price}
              </span>
              {plan.priceNote && (
                <span className="text-sm text-zinc-500">{plan.priceNote}</span>
              )}
            </div>

            <ul className="space-y-3 flex-1 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check className="h-4 w-4 text-violet-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {plan.current ? (
              <Button variant="secondary" disabled className="w-full">
                Текущий план
              </Button>
            ) : (
              <Button
                variant={plan.popular ? "primary" : "secondary"}
                className="w-full"
              >
                Выбрать
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
