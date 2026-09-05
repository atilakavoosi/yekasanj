import type { Category, Unit } from "@/types/unit";

export function toBaseValue(unit: Unit, value: number): number {
  if (unit.toBase) return unit.toBase(value);
  if (unit.factorToBase !== undefined) return value * unit.factorToBase;
  throw new Error(`Unit ${unit.id} has no conversion definition`);
}

export function fromBaseValue(unit: Unit, baseValue: number): number {
  if (unit.fromBase) return unit.fromBase(baseValue);
  if (unit.factorToBase !== undefined) return baseValue / unit.factorToBase;
  throw new Error(`Unit ${unit.id} has no conversion definition`);
}

export function convert(category: Category, fromId: string, toId: string, value: number): number {
  const fromUnit = category.units.find((u) => u.id === fromId);
  const toUnit = category.units.find((u) => u.id === toId);
  if (!fromUnit || !toUnit) {
    throw new Error(`Unknown unit in category ${category.id}: ${fromId} -> ${toId}`);
  }
  const base = toBaseValue(fromUnit, value);
  return fromBaseValue(toUnit, base);
}

export function findUnit(category: Category, unitId: string): Unit | undefined {
  return category.units.find((u) => u.id === unitId);
}
