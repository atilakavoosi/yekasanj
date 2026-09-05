export interface BaseQuantity {
  categoryId: string;
  note: string;
}

export interface FormulaEntry {
  categoryId: string;
  formula: string;
  meaning: string;
  note?: string;
}

export interface TemperatureFormula {
  label: string;
  formula: string;
}

export interface PhysicalConstant {
  symbol: string;
  name: string;
  value: string;
}

export const baseQuantities: BaseQuantity[] = [
  { categoryId: "length", note: "کمیت پایهٔ SI؛ به‌طور مستقیم اندازه‌گیری می‌شود و مبنای مساحت، حجم و سرعت است." },
  { categoryId: "mass", note: "کمیت پایهٔ SI؛ مقدار ماده در یک جسم را نشان می‌دهد." },
  { categoryId: "time", note: "کمیت پایهٔ SI؛ مبنای تعریف سرعت، شتاب، توان و فرکانس." },
  { categoryId: "current", note: "کمیت پایهٔ SI برای الکتریسیته؛ نرخ عبور بار الکتریکی از یک نقطه." },
  { categoryId: "temperature", note: "کمیت پایه؛ کلوین یکای SI آن است (نگاه کنید به فرمول‌های تبدیل دما در پایین)." },
];

export const derivedFormulas: FormulaEntry[] = [
  { categoryId: "area", formula: "A = L × W", meaning: "A: مساحت (m²) — L, W: طول و عرض (m)" },
  { categoryId: "volume", formula: "V = L × W × H", meaning: "V: حجم (m³) — L, W, H: ابعاد (m)" },
  { categoryId: "speed", formula: "v = d / t", meaning: "v: سرعت (m/s) — d: مسافت (m) — t: زمان (s)" },
  { categoryId: "acceleration", formula: "a = Δv / Δt", meaning: "a: شتاب (m/s²) — Δv: تغییر سرعت (m/s) — Δt: تغییر زمان (s)" },
  {
    categoryId: "momentum",
    formula: "p = m × v",
    meaning: "p: تکانه (kg·m/s) — m: جرم (kg) — v: سرعت (m/s)",
    note: "ضربه (Impulse): J = F × Δt = Δp",
  },
  { categoryId: "force", formula: "F = m × a", meaning: "F: نیرو (N) — m: جرم (kg) — a: شتاب (m/s²)", note: "قانون دوم نیوتن" },
  { categoryId: "pressure", formula: "P = F / A", meaning: "P: فشار (Pa) — F: نیرو (N) — A: مساحت (m²)" },
  {
    categoryId: "energy",
    formula: "W = F × d",
    meaning: "W: کار (J) — F: نیرو (N) — d: جابه‌جایی (m)",
    note: "انرژی جنبشی: KE = ½ m v²   —   انرژی پتانسیل گرانشی: PE = m g h",
  },
  { categoryId: "power", formula: "P = W / t", meaning: "P: توان (W) — W: کار (J) — t: زمان (s)", note: "هم‌ارز با: P = F × v" },
  { categoryId: "density", formula: "ρ = m / V", meaning: "ρ: چگالی (kg/m³) — m: جرم (kg) — V: حجم (m³)" },
  { categoryId: "charge", formula: "Q = I × t", meaning: "Q: بار الکتریکی (C) — I: جریان (A) — t: زمان (s)" },
  { categoryId: "voltage", formula: "V = W / Q", meaning: "V: ولتاژ (V) — W: انرژی (J) — Q: بار (C)", note: "قانون اهم: V = I × R" },
  { categoryId: "resistance", formula: "R = V / I", meaning: "R: مقاومت (Ω) — V: ولتاژ (V) — I: جریان (A)", note: "قانون اهم" },
  { categoryId: "capacitance", formula: "C = Q / V", meaning: "C: ظرفیت خازنی (F) — Q: بار (C) — V: ولتاژ (V)" },
  { categoryId: "frequency", formula: "f = 1 / T", meaning: "f: فرکانس (Hz) — T: تناوب یا دورهٔ تناوب (s)" },
  {
    categoryId: "wavelength",
    formula: "λ = v / f",
    meaning: "λ: طول موج (m) — v: سرعت موج (m/s) — f: فرکانس (Hz)",
    note: "برای امواج الکترومغناطیسی: c = f × λ",
  },
  {
    categoryId: "magneticField",
    formula: "F = q × v × B",
    meaning: "F: نیروی لورنتس (N) — q: بار (C) — v: سرعت (m/s) — B: میدان مغناطیسی (T)",
  },
];

export const temperatureFormulas: TemperatureFormula[] = [
  { label: "سلسیوس به کلوین", formula: "K = °C + 273.15" },
  { label: "سلسیوس به فارنهایت", formula: "°F = °C × 9⁄5 + 32" },
  { label: "فارنهایت به کلوین", formula: "K = (°F + 459.67) × 5⁄9" },
];

export const physicalConstants: PhysicalConstant[] = [
  { symbol: "g", name: "شتاب گرانش استاندارد زمین", value: "9.80665 m/s²" },
  { symbol: "c", name: "سرعت نور در خلأ", value: "299,792,458 m/s" },
  { symbol: "e", name: "بار بنیادی الکترون", value: "1.602176634 × 10⁻¹⁹ C" },
  { symbol: "0 K", name: "صفر مطلق", value: "−273.15 °C  =  −459.67 °F" },
];
