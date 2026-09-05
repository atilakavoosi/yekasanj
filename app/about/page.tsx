import type { Metadata } from "next";
import { Atom, GitFork } from "lucide-react";

export const metadata: Metadata = {
  title: "دربارهٔ ما | یکاسنج",
  description: "چرا یکاسنج ساخته شد و پشت این پروژه چه ایده‌ای است.",
};

export default function AboutPage() {
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

      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 pb-24 pt-10 sm:pt-14">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-900/60 bg-cyan-500/10 text-cyan-300">
            <Atom className="h-5 w-5" aria-hidden />
          </span>
          <h1 className="text-2xl font-bold text-slate-100 sm:text-4xl">دربارهٔ یکاسنج</h1>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-sm leading-7 text-slate-300 sm:p-8">
          <p>
            وسط حل یک مسئلهٔ فیزیک، یک عدد با یکای اشتباه ظاهر می‌شود و باید سریع psi را به پاسکال، یا کالری را به ژول تبدیل کرد.
            جستجو در گوگل کار می‌کند، اما کند است، پر از تبلیغ است و برای فارسی‌زبان‌ها طراحی نشده.
          </p>
          <p>
            <strong className="font-semibold text-slate-100">یکاسنج</strong> برای حل همین مسئلهٔ کوچک اما تکرارشونده ساخته شد: تبدیل
            آنی بیش از ۲۰ کمیت فیزیکی و صدها یکا، با جستجوی سریع و رابطی کاملاً فارسی و راست‌به‌چپ — بدون کلیک اضافه، بدون تبلیغ.
          </p>
          <p>این پروژه به‌عنوان یک محصول کوچک اما جمع‌وجور ساخته شده، با تمرکز بر درستی محاسباتی، سرعت و طراحی تمیز.</p>
        </div>

        <a
          href="https://github.com/atilakavoosi/yekasanj"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-300"
        >
          <GitFork className="h-4 w-4" aria-hidden />
          کد منبع در گیت‌هاب
        </a>
      </div>
    </main>
  );
}
