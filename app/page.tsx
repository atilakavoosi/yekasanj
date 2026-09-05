import { Atom } from "lucide-react";
import Converter from "@/components/Converter";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgb(34 211 238 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(34 211 238 / 0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 pb-24 pt-10 sm:pt-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-900/60 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
            <Atom className="h-3.5 w-3.5" aria-hidden />
            مبدل یکاهای فیزیک
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            تبدیل یکاهای فیزیک،{" "}
            <span className="bg-gradient-to-l from-cyan-300 to-sky-400 bg-clip-text text-transparent">در یک لحظه.</span>
          </h1>
          <p className="max-w-xl text-balance text-sm text-slate-400 sm:text-base">
            تبدیل‌های سریع و دقیق در همهٔ کمیت‌های اصلی فیزیک — ساخته‌شده برای دانش‌آموزان و یادگیرندگان.
          </p>
        </div>

        <Converter />
      </div>
    </main>
  );
}
