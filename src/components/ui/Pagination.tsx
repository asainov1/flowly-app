"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
  onOffsetChange: (offset: number) => void;
}

export function Pagination({
  total,
  limit,
  offset,
  onOffsetChange,
}: PaginationProps) {
  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm text-zinc-500">
        Показано {offset + 1}–{Math.min(offset + limit, total)} из {total}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onOffsetChange(Math.max(0, offset - limit))}
        >
          <ChevronLeft className="h-4 w-4" />
          Назад
        </Button>
        <span className="text-sm text-zinc-400 px-2">
          {page} / {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onOffsetChange(offset + limit)}
        >
          Вперёд
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
