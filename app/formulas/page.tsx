import type { Metadata } from "next";
import { getCategory } from "@/data/categories";
import { baseQuantities, derivedFormulas, physicalConstants, temperatureFormulas } from "@/data/formulas";

export const metadata: Metadata = {
  title: "فرمول‌ها و ثابت‌ها | یکاسنج",
  description: "مرجع فرمول‌های فیزیکی و ثابت‌های علمی پشت هر کمیتی که یکاسنج تبدیل می‌کند.",
};

export default function FormulasPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgb(34 211 238 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(34 211 238 / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 45% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 pb-24 pt-10 sm:pt-14">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-2xl font-bold text-slate-100 sm:text-4xl">فرمول‌ها و ثابت‌ها</h1>
          <p className="mx-auto max-w-xl text-balance text-sm text-slate-400">
            مرجع سریع فرمول‌های فیزیکی و ثابت‌های علمی که پشت هر کمیتی در یکاسنج قرار دارد.
          </p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-cyan-300">کمیت‌های پایه</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {baseQuantities.map(({ categoryId, note }) => {
              const category = getCategory(categoryId);
              if (!category) return null;
              const Icon = category.icon;
              return (
                <div key={categoryId} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-400" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {category.name} <span className="font-mono text-xs text-slate-500">({category.symbol})</span>
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-cyan-300">کمیت‌های مشتق‌شده و فرمول آن‌ها</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {derivedFormulas.map(({ categoryId, formula, meaning, note }) => {
              const category = getCategory(categoryId);
              if (!category) return null;
              const Icon = category.icon;
              return (
                <div key={categoryId} className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4.5 w-4.5 shrink-0 text-cyan-400" aria-hidden />
                    <p className="text-sm font-semibold text-slate-100">{category.name}</p>
                  </div>
                  <p dir="ltr" className="rounded-lg bg-slate-950/60 px-3 py-2 text-center font-mono text-base text-cyan-300">
                    {formula}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">{meaning}</p>
                  {note && <p className="text-xs leading-relaxed text-slate-500">{note}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-cyan-300">فرمول‌های تبدیل دما</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
            {temperatureFormulas.map(({ label, formula }, i) => (
              <div
                key={label}
                className={`flex flex-wrap items-center justify-between gap-2 px-4 py-3 ${i !== 0 ? "border-t border-slate-800" : ""}`}
              >
                <span className="text-sm text-slate-300">{label}</span>
                <span dir="ltr" className="font-mono text-sm text-cyan-300">
                  {formula}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-cyan-300">ثابت‌های فیزیکی مهم</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {physicalConstants.map(({ symbol, name, value }) => (
              <div key={symbol} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{name}</p>
                  <p dir="ltr" className="mt-1 font-mono text-xs text-slate-400">
                    {value}
                  </p>
                </div>
                <span dir="ltr" className="shrink-0 font-mono text-lg text-cyan-300">
                  {symbol}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
