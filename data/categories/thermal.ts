import { Thermometer } from "lucide-react";
import type { Category } from "@/types/unit";

export const thermalCategories: Category[] = [
  {
    id: "temperature",
    name: "دما",
    nameEn: "temperature",
    symbol: "T",
    icon: Thermometer,
    baseUnitId: "k",
    defaultUnits: ["c", "f"],
    units: [
      {
        id: "c",
        name: "سلسیوس",
        nameEn: "celsius",
        symbol: "°C",
        toBase: (v) => v + 273.15,
        fromBase: (v) => v - 273.15,
      },
      {
        id: "f",
        name: "فارنهایت",
        nameEn: "fahrenheit",
        symbol: "°F",
        toBase: (v) => ((v + 459.67) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 - 459.67,
      },
      {
        id: "k",
        name: "کلوین",
        nameEn: "kelvin",
        symbol: "K",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
    ],
  },
];
