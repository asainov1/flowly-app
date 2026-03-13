"use client";

import { type ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: number;
  className?: string;
}

export function StatCard({ icon, label, value, change, className = "" }: StatCardProps) {
  return (
    <div className={`glass rounded-xl p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-violet-600/10 text-violet-400">
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              change >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-zinc-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
