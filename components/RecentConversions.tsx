"use client";

import { History } from "lucide-react";
import { getCategory } from "@/data/categories";
import type { RecentConversion } from "@/lib/recent";

interface RecentConversionsProps {
  items: RecentConversion[];
  onSelect: (item: RecentConversion) => void;
}

export default function RecentConversions({ items, onSelect }: RecentConversionsProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <History className="h-3.5 w-3.5" aria-hidden />
        اخیر:
      </span>
      {items.map((item, i) => {
        const category = getCategory(item.categoryId);
        if (!category) return null;
        const from = category.units.find((u) => u.id === item.fromId);
        const to = category.units.find((u) => u.id === item.toId);
        if (!from || !to) return null;
        return (
          <button
            key={`${item.categoryId}-${item.fromId}-${item.toId}-${i}`}
            type="button"
            onClick={() => onSelect(item)}
            className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-400 transition hover:border-cyan-500/40 hover:text-cyan-300"
          >
            {from.symbol} → {to.symbol}
          </button>
        );
      })}
    </div>
  );
}
