import { Radio, Waves, Magnet } from "lucide-react";
import type { Category } from "@/types/unit";

export const wavesCategories: Category[] = [
  {
    id: "frequency",
    name: "فرکانس",
    nameEn: "frequency",
    symbol: "f",
    icon: Radio,
    baseUnitId: "hz",
    defaultUnits: ["hz", "khz"],
    units: [
      { id: "hz", name: "هرتز", nameEn: "hertz", symbol: "Hz", factorToBase: 1 },
      { id: "khz", name: "کیلوهرتز", nameEn: "kilohertz", symbol: "kHz", factorToBase: 1000 },
      { id: "mhz", name: "مگاهرتز", nameEn: "megahertz", symbol: "MHz", factorToBase: 1e6 },
      { id: "ghz", name: "گیگاهرتز", nameEn: "gigahertz", symbol: "GHz", factorToBase: 1e9 },
      { id: "rpm", name: "دور بر دقیقه", nameEn: "revolutions per minute", symbol: "rpm", factorToBase: 1 / 60 },
    ],
  },
  {
    id: "wavelength",
    name: "طول موج",
    nameEn: "wavelength",
    symbol: "λ",
    icon: Waves,
    baseUnitId: "m",
    defaultUnits: ["nm", "a"],
    units: [
      { id: "m", name: "متر", nameEn: "meter", symbol: "m", factorToBase: 1 },
      { id: "mm", name: "میلی‌متر", nameEn: "millimeter", symbol: "mm", factorToBase: 0.001 },
      { id: "um", name: "میکرومتر", nameEn: "micrometer", symbol: "μm", factorToBase: 1e-6 },
      { id: "nm", name: "نانومتر", nameEn: "nanometer", symbol: "nm", factorToBase: 1e-9 },
      { id: "a", name: "آنگستروم", nameEn: "angstrom", symbol: "Å", factorToBase: 1e-10 },
      { id: "pm", name: "پیکومتر", nameEn: "picometer", symbol: "pm", factorToBase: 1e-12 },
    ],
  },
  {
    id: "magneticField",
    name: "میدان مغناطیسی",
    nameEn: "magnetic field",
    symbol: "B",
    icon: Magnet,
    baseUnitId: "t",
    defaultUnits: ["t", "g"],
    units: [
      { id: "t", name: "تسلا", nameEn: "tesla", symbol: "T", factorToBase: 1 },
      { id: "mt", name: "میلی‌تسلا", nameEn: "millitesla", symbol: "mT", factorToBase: 0.001 },
      { id: "ut", name: "میکروتسلا", nameEn: "microtesla", symbol: "μT", factorToBase: 1e-6 },
      { id: "g", name: "گاوس", nameEn: "gauss", symbol: "G", factorToBase: 1e-4 },
    ],
  },
];
