const PLAIN_MIN = 1e-6;
const PLAIN_MAX = 1e15;

const SUPERSCRIPT_MAP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
  "+": "",
};

function toSuperscript(n: number): string {
  return n
    .toString()
    .split("")
    .map((ch) => SUPERSCRIPT_MAP[ch] ?? ch)
    .join("");
}

/** Rounds to `sig` significant digits and clears binary-float artifacts like 0.30000000000000004 */
export function roundSignificant(value: number, sig = 6): number {
  if (value === 0 || !Number.isFinite(value)) return value;
  return Number(value.toPrecision(Math.min(21, Math.max(1, sig))));
}

function toPlainString(n: number): string {
  const sign = n < 0 ? "-" : "";
  const [intPart, decPart] = Math.abs(n).toString().split(".");
  const groupedInt = Number(intPart).toLocaleString("en-US");
  return decPart ? `${sign}${groupedInt}.${decPart}` : `${sign}${groupedInt}`;
}

function toScientificString(n: number, sig: number): string {
  const exp = n.toExponential(Math.max(0, sig - 1));
  const [mantissaRaw, expRaw] = exp.split("e");
  const mantissa = Number(mantissaRaw).toString();
  const expNum = Number(expRaw);
  return `${mantissa} × 10${toSuperscript(expNum)}`;
}

/** Human-friendly display string: grouped decimals, or clean scientific notation for extreme magnitudes. */
export function formatNumber(value: number, sig = 6): string {
  if (Number.isNaN(value)) return "نامعتبر";
  if (!Number.isFinite(value)) return value > 0 ? "∞" : "−∞";
  if (value === 0) return "0";

  const rounded = roundSignificant(value, sig);
  const roundedAbs = Math.abs(rounded);

  if (roundedAbs !== 0 && (roundedAbs < PLAIN_MIN || roundedAbs >= PLAIN_MAX)) {
    return toScientificString(rounded, sig);
  }
  return toPlainString(rounded);
}

/** Plain ASCII representation (no grouping/unicode) safe to copy to clipboard. */
export function formatForCopy(value: number, sig = 6): string {
  if (!Number.isFinite(value)) return String(value);
  const rounded = roundSignificant(value, sig);
  return String(rounded);
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const NUMBER_RE = /^-?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i;

function normalizeDigits(input: string): string {
  return input.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d))).replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}

/** Parses user input into a finite number, tolerating Persian digits, thousands separators and scientific notation. Returns null when invalid. */
export function parseUserNumber(raw: string): number | null {
  if (raw == null) return null;
  const normalized = normalizeDigits(raw.trim()).replace(/,/g, "");
  if (normalized === "" || normalized === "-") return null;
  if (!NUMBER_RE.test(normalized)) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}
