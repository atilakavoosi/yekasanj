import type { LucideIcon } from "lucide-react";

export interface Unit {
  /** Unique within its category, e.g. "m", "km", "celsius" */
  id: string;
  /** Persian display name, e.g. "متر" */
  name: string;
  /** English name, used for search, e.g. "meter" */
  nameEn: string;
  /** Displayed unit symbol, e.g. "m", "کیلومتر/ساعت", "°C" */
  symbol: string;
  /** Extra search keywords: alternate spellings, abbreviations */
  aliases?: string[];
  /** Multiply-by-base conversions use factorToBase (value_base = value * factorToBase) */
  factorToBase?: number;
  /** Affine conversions (e.g. temperature) provide explicit functions instead */
  toBase?: (value: number) => number;
  fromBase?: (value: number) => number;
}

export interface Category {
  id: string;
  /** Persian display name, e.g. "طول" */
  name: string;
  /** English name, used for search, e.g. "length" */
  nameEn: string;
  /** Persian quantity symbol shown in the UI, e.g. "L" */
  symbol: string;
  icon: LucideIcon;
  /** id of the base unit within `units`, all factors are relative to it */
  baseUnitId: string;
  units: Unit[];
  /** Two unit ids to preselect when the category is first opened */
  defaultUnits: [string, string];
}
