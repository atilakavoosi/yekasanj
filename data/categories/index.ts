import type { Category } from "@/types/unit";
import { mechanicsCategories } from "./mechanics";
import { thermalCategories } from "./thermal";
import { electricityCategories } from "./electricity";
import { wavesCategories } from "./waves";

export const categories: Category[] = [...mechanicsCategories, ...thermalCategories, ...electricityCategories, ...wavesCategories];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
