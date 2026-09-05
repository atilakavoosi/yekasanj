"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchUnits } from "@/lib/search";
import type { Category } from "@/types/unit";

interface SearchBarProps {
  onSelect: (category: Category, unitId: string) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchUnits(query), [query]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleSelect(category: Category, unitId: string) {
    onSelect(category, unitId);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm transition focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/20">
        <Search className="h-4.5 w-4.5 shrink-0 text-slate-500" aria-hidden />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="جستجوی هر یکایی — متر، N، ژول، پاسکال..."
          aria-label="جستجوی سراسری واحدها"
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="پاک کردن جستجو" className="text-slate-500 hover:text-slate-300">
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/40">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">چیزی پیدا نشد</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto py-1">
              {results.map(({ category, unit }) => {
                const Icon = category.icon;
                return (
                  <li key={`${category.id}-${unit.id}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(category, unit.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition hover:bg-cyan-500/10"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
                        <span className="truncate text-slate-100">{unit.name}</span>
                        <span className="shrink-0 font-mono text-xs text-slate-500">{unit.symbol}</span>
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">{category.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
