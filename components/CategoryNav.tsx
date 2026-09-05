"use client";

import type { Category } from "@/types/unit";

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (category: Category) => void;
}

export default function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  return (
    <nav aria-label="دسته‌بندی کمیت‌های فیزیکی" className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <ul className="flex w-max min-w-full gap-2 sm:flex-wrap sm:w-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          const active = category.id === activeId;
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelect(category)}
                aria-current={active}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-sm shadow-cyan-400/20"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
