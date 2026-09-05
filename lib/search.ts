import type { Category, Unit } from "@/types/unit";
import { categories } from "@/data/categories";

export interface UnitSearchResult {
  category: Category;
  unit: Unit;
}

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/‌/g, "");
}

function fieldScore(query: string, field: string): number {
  const f = normalize(field);
  if (f === query) return 3;
  if (f.startsWith(query)) return 2;
  if (f.includes(query)) return 1;
  return 0;
}

function unitScore(query: string, unit: Unit): number {
  const fields = [unit.symbol, unit.name, unit.nameEn, ...(unit.aliases ?? [])];
  return Math.max(0, ...fields.map((f) => fieldScore(query, f)));
}

/** Searches every unit across all categories by symbol, Persian/English name or alias. */
export function searchUnits(query: string, limit = 8): UnitSearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  const results: (UnitSearchResult & { score: number })[] = [];
  for (const category of categories) {
    for (const unit of category.units) {
      const score = unitScore(q, unit);
      if (score > 0) results.push({ category, unit, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit).map(({ category, unit }) => ({ category, unit }));
}

/** Searches categories themselves by Persian/English name or quantity symbol. */
export function searchCategories(query: string, limit = 6): Category[] {
  const q = normalize(query);
  if (!q) return categories.slice(0, limit);

  return categories
    .map((category) => ({ category, score: Math.max(fieldScore(q, category.name), fieldScore(q, category.nameEn), fieldScore(q, category.symbol)) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((c) => c.category);
}
