"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Megaphone,
  Users,
  Globe,
  Phone,
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { addDemoAgent, getTypeName } from "@/lib/demo-agents";

const agentTypes = [
  {
    id: "chatbot",
    name: "Чат-бот",
    description: "Автоматизация общения с клиентами",
    icon: MessageSquare,
  },
  {
    id: "marketer",
    name: "Маркетолог",
    description: "Генерация контента и анализ рынка",
    icon: Megaphone,
  },
  {
    id: "hr",
    name: "HR",
    description: "Подбор и оценка кандидатов",
    icon: Users,
  },
  {
    id: "browser",
    name: "Браузерный",
    description: "Автоматизация веб-действий",
    icon: Globe,
  },
  {
    id: "voice",
    name: "Голосовой",
    description: "Голосовое взаимодействие с клиентами",
    icon: Phone,
  },
  {
    id: "analytics",
    name: "Аналитика",
    description: "Анализ данных и отчётность",
    icon: BarChart3,
  },
];

const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku" },
];

const steps = ["Тип агента", "Настройка", "Запуск"];

export default function NewAgentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [instructions, setInstructions] = useState("");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : router.push("/agents"))}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-zinc-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Создать агента</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Шаг {step + 1} из {steps.length}: {steps[step]}
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-violet-600" : "bg-white/5"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Step 1: Type selection */}
      {step === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agentTypes.map((type) => {
            const Icon = type.icon;
            const active = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`glass rounded-xl p-5 text-left transition-all ${
                  active
                    ? "ring-2 ring-violet-600 bg-violet-600/5"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg w-fit mb-3 ${
                    active
                      ? "bg-violet-600/20 text-violet-400"
                      : "bg-white/5 text-zinc-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-medium text-white">{type.name}</p>
                <p className="text-sm text-zinc-500 mt-1">{type.description}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2: Configuration */}
      {step === 1 && (
        <Card>
          <div className="space-y-5">
            <Input
              label="Имя агента"
              placeholder="Мой AI-помощник"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Описание"
              placeholder="Краткое описание назначения агента"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-400">
                Модель
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600/50"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id} className="bg-zinc-900">
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-400">
                Инструкции
              </label>
              <textarea
                rows={5}
                placeholder="Опишите, как агент должен себя вести..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600/50 resize-none"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Success */}
      {step === 2 && (
        <Card className="text-center py-12">
          <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-4">
            <Check className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Агент создан!</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Ваш агент &quot;{name || "Новый агент"}&quot; готов к работе
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={() => router.push("/agents")}>
              К списку агентов
            </Button>
            <Button onClick={() => router.push("/agents")}>
              Открыть агента
            </Button>
          </div>
        </Card>
      )}

      {/* Navigation */}
      {step < 2 && (
        <div className="flex justify-end gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Назад
            </Button>
          )}
          <Button
            disabled={step === 0 && !selectedType}
            onClick={() => {
              if (step === 1) {
                // Save new agent to demo store
                addDemoAgent({
                  id: crypto.randomUUID(),
                  name: name || "Новый агент",
                  type: getTypeName(selectedType),
                  organization_id: 1,
                  status: "active",
                  model: models.find((m) => m.id === model)?.name || model,
                  description: description || "",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  total_messages: 0,
                  total_dialogues: 0,
                });
              }
              setStep(step + 1);
            }}
          >
            {step === 1 ? "Создать" : "Далее"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
