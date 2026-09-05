"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { Unit } from "@/types/unit";

interface UnitComboboxProps {
  units: Unit[];
  valueId: string;
  onChange: (id: string) => void;
  label: string;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک");
}

export default function UnitCombobox({ units, valueId, onChange, label }: UnitComboboxProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = units.find((u) => u.id === valueId) ?? units[0];

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function commit(id: string) {
    onChange(id);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5 text-start shadow-sm transition hover:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-slate-100">{selected?.name}</span>
          <span className="truncate font-mono text-xs text-slate-500">{selected?.symbol}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
      </button>

      {open && <UnitDropdownPanel units={units} valueId={valueId} onCommit={commit} />}
    </div>
  );
}

interface UnitDropdownPanelProps {
  units: Unit[];
  valueId: string;
  onCommit: (id: string) => void;
}

function UnitDropdownPanel({ units, valueId, onCommit }: UnitDropdownPanelProps) {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(() => Math.max(0, units.findIndex((u) => u.id === valueId)));

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return units;
    return units.filter((u) => [u.name, u.nameEn, u.symbol, ...(u.aliases ?? [])].some((f) => normalize(f).includes(q)));
  }, [units, query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filtered[highlight];
      if (target) onCommit(target.id);
    }
  }

  return (
    <div className="absolute z-20 mt-2 w-64 max-w-[85vw] overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-slate-800 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="جستجوی واحد..."
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>
      <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
        {filtered.length === 0 && <li className="px-3 py-2 text-sm text-slate-500">واحدی پیدا نشد</li>}
        {filtered.map((u, i) => (
          <li key={u.id} role="option" aria-selected={u.id === valueId}>
            <button
              type="button"
              onMouseEnter={() => setHighlight(i)}
              onClick={() => onCommit(u.id)}
              className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm transition ${
                i === highlight ? "bg-cyan-500/10" : ""
              } ${u.id === valueId ? "font-semibold text-cyan-300" : "text-slate-300"}`}
            >
              <span className="truncate">{u.name}</span>
              <span className="shrink-0 font-mono text-xs text-slate-500">{u.symbol}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
