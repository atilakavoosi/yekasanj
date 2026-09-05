"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
}

export default function SwapButton({ onSwap }: SwapButtonProps) {
  const [spun, setSpun] = useState(false);

  function handleClick() {
    onSwap();
    setSpun(true);
    setTimeout(() => setSpun(false), 300);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="جابه‌جایی واحد مبدأ و مقصد"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-cyan-400 shadow-sm transition hover:border-cyan-500/50 hover:bg-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    >
      <ArrowLeftRight className={`h-5 w-5 transition-transform duration-300 ${spun ? "rotate-180" : ""}`} aria-hidden />
    </button>
  );
}
