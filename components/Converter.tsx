"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { categories, getCategory } from "@/data/categories";
import type { Category } from "@/types/unit";
import { addRecentConversion, getRecentServerSnapshot, getRecentSnapshot, subscribeRecent, type RecentConversion } from "@/lib/recent";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import ConverterCard from "./ConverterCard";
import RecentConversions from "./RecentConversions";

export default function Converter() {
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [fromUnitId, setFromUnitId] = useState(categories[0].defaultUnits[0]);
  const [toUnitId, setToUnitId] = useState(categories[0].defaultUnits[1]);
  const recent = useSyncExternalStore(subscribeRecent, getRecentSnapshot, getRecentServerSnapshot);

  const category = getCategory(categoryId) ?? categories[0];

  const record = useCallback((entry: RecentConversion) => {
    addRecentConversion(entry);
  }, []);

  const handleSelectCategory = useCallback((next: Category) => {
    setCategoryId(next.id);
    setFromUnitId(next.defaultUnits[0]);
    setToUnitId(next.defaultUnits[1]);
  }, []);

  const handleSearchSelect = useCallback((cat: Category, unitId: string) => {
    const other = cat.defaultUnits.find((id) => id !== unitId) ?? cat.units.find((u) => u.id !== unitId)?.id ?? unitId;
    setCategoryId(cat.id);
    setFromUnitId(unitId);
    setToUnitId(other);
    record({ categoryId: cat.id, fromId: unitId, toId: other });
  }, [record]);

  const handleChangeFromUnit = useCallback(
    (id: string) => {
      setFromUnitId(id);
      record({ categoryId, fromId: id, toId: toUnitId });
    },
    [categoryId, toUnitId, record],
  );

  const handleChangeToUnit = useCallback(
    (id: string) => {
      setToUnitId(id);
      record({ categoryId, fromId: fromUnitId, toId: id });
    },
    [categoryId, fromUnitId, record],
  );

  const handleSwap = useCallback(() => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
    record({ categoryId, fromId: toUnitId, toId: fromUnitId });
  }, [categoryId, fromUnitId, toUnitId, record]);

  const handleSelectRecent = useCallback((item: RecentConversion) => {
    setCategoryId(item.categoryId);
    setFromUnitId(item.fromId);
    setToUnitId(item.toId);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <SearchBar onSelect={handleSearchSelect} />
      <CategoryNav categories={categories} activeId={categoryId} onSelect={handleSelectCategory} />
      <ConverterCard
        key={category.id}
        category={category}
        fromUnitId={fromUnitId}
        toUnitId={toUnitId}
        onChangeFromUnit={handleChangeFromUnit}
        onChangeToUnit={handleChangeToUnit}
        onSwap={handleSwap}
      />
      <RecentConversions items={recent} onSelect={handleSelectRecent} />
    </div>
  );
}
