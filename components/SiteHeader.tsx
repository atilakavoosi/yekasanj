import Link from "next/link";
import { Atom } from "lucide-react";

const NAV_LINKS = [
  { href: "/formulas", label: "فرمول‌ها و ثابت‌ها" },
  { href: "/about", label: "دربارهٔ ما" },
];

export default function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-4 pt-6 sm:pt-8">
      <Link href="/" className="flex items-center gap-1.5 text-sm font-bold text-slate-100">
        <Atom className="h-4 w-4 text-cyan-400" aria-hidden />
        یکاسنج
      </Link>
      <nav aria-label="ناوبری اصلی" className="flex items-center gap-5">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-xs font-medium text-slate-400 transition hover:text-cyan-300 sm:text-sm">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
