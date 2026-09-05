"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Category } from "@/types/unit";
import { convert, findUnit } from "@/lib/conversion";
import { formatNumber, formatForCopy, parseUserNumber } from "@/lib/format";
import UnitCombobox from "./UnitCombobox";
import SwapButton from "./SwapButton";
import CopyButton from "./CopyButton";

interface ConverterCardProps {
  category: Category;
  fromUnitId: string;
  toUnitId: string;
  onChangeFromUnit: (id: string) => void;
  onChangeToUnit: (id: string) => void;
  onSwap: () => void;
}

type Side = "from" | "to";

const MIN_PRECISION = 2;
const MAX_PRECISION = 10;

export default function ConverterCard({ category, fromUnitId, toUnitId, onChangeFromUnit, onChangeToUnit, onSwap }: ConverterCardProps) {
  const [rawValue, setRawValue] = useState("1");
  const [activeSide, setActiveSide] = useState<Side>("from");
  const [precision, setPrecision] = useState(6);

  const fromUnit = findUnit(category, fromUnitId);
  const toUnit = findUnit(category, toUnitId);

  const parsed = parseUserNumber(rawValue);
  const hasError = rawValue.trim() !== "" && parsed === null;

  const computed = useMemo(() => {
    if (parsed === null || !fromUnit || !toUnit) return null;
    try {
      return activeSide === "from" ? convert(category, fromUnitId, toUnitId, parsed) : convert(category, toUnitId, fromUnitId, parsed);
    } catch {
      return null;
    }
  }, [parsed, category, fromUnitId, toUnitId, activeSide, fromUnit, toUnit]);

  const fromDisplay = activeSide === "from" ? rawValue : computed !== null ? formatNumber(computed, precision) : "";
  const toDisplay = activeSide === "to" ? rawValue : computed !== null ? formatNumber(computed, precision) : "";

  const fromCopyValue = activeSide === "from" ? rawValue : computed !== null ? formatForCopy(computed, precision) : "";
  const toCopyValue = activeSide === "to" ? rawValue : computed !== null ? formatForCopy(computed, precision) : "";

  function handleSwap() {
    const carried = activeSide === "to" ? rawValue : computed !== null ? formatForCopy(computed, precision) : rawValue;
    onSwap();
    setRawValue(carried);
    setActiveSide("from");
  }

  function handleClear() {
    setRawValue("");
    setActiveSide("from");
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 shadow-xl shadow-black/30 backdrop-blur-sm sm:p-7">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="from-value" className="text-xs font-medium text-slate-500">
              از
            </label>
            <CopyButton value={fromCopyValue} disabled={!fromCopyValue} />
          </div>
          <input
            id="from-value"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            value={fromDisplay}
            onChange={(e) => {
              setRawValue(e.target.value);
              setActiveSide("from");
            }}
            placeholder="0"
            aria-invalid={hasError && activeSide === "from"}
            className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 font-mono text-lg text-slate-100 shadow-sm outline-none transition focus:ring-2 ${
              hasError && activeSide === "from" ? "border-rose-500/70 focus:ring-rose-500/20" : "border-slate-800 focus:border-cyan-500/60 focus:ring-cyan-500/20"
            }`}
          />
          <UnitCombobox units={category.units} valueId={fromUnitId} onChange={onChangeFromUnit} label="واحد مبدأ" />
        </div>

        <div className="flex justify-center pt-8 sm:pt-9">
          <SwapButton onSwap={handleSwap} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="to-value" className="text-xs font-medium text-slate-500">
              به
            </label>
            <CopyButton value={toCopyValue} disabled={!toCopyValue} />
          </div>
          <input
            id="to-value"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            value={toDisplay}
            onChange={(e) => {
              setRawValue(e.target.value);
              setActiveSide("to");
            }}
            placeholder="0"
            aria-invalid={hasError && activeSide === "to"}
            className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 font-mono text-lg text-slate-100 shadow-sm outline-none transition focus:ring-2 ${
              hasError && activeSide === "to" ? "border-rose-500/70 focus:ring-rose-500/20" : "border-slate-800 focus:border-cyan-500/60 focus:ring-cyan-500/20"
            }`}
          />
          <UnitCombobox units={category.units} valueId={toUnitId} onChange={onChangeToUnit} label="واحد مقصد" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4">
        {hasError ? (
          <p className="text-xs font-medium text-rose-400">عدد واردشده معتبر نیست</p>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <label htmlFor="precision" className="shrink-0 text-xs text-slate-500">
              دقت
            </label>
            <input
              id="precision"
              type="range"
              min={MIN_PRECISION}
              max={MAX_PRECISION}
              step={1}
              value={precision}
              onChange={(e) => setPrecision(Number(e.target.value))}
              className="w-full max-w-[10rem]"
              aria-label="تعداد ارقام معنادار نتیجه"
            />
            <span className="shrink-0 font-mono text-xs text-cyan-300">{precision}</span>
          </div>
        )}
        <button
          type="button"
          onClick={handleClear}
          className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-cyan-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          پاک‌کردن
        </button>
      </div>
    </div>
  );
}
