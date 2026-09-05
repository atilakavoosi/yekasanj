export interface RecentConversion {
  categoryId: string;
  fromId: string;
  toId: string;
}

const STORAGE_KEY = "yekasanj:recent";
const MAX_RECENT = 8;

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: RecentConversion[] | null = null;

function readFromStorage(): RecentConversion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isSameConversion(a: RecentConversion, b: RecentConversion): boolean {
  return a.categoryId === b.categoryId && a.fromId === b.fromId && a.toId === b.toId;
}

function notify() {
  listeners.forEach((listener) => listener());
}

/** Snapshot for useSyncExternalStore on the client. */
export function getRecentSnapshot(): RecentConversion[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

/** Snapshot for useSyncExternalStore during SSR/first paint — always empty to avoid hydration mismatches. */
export function getRecentServerSnapshot(): RecentConversion[] {
  return [];
}

export function subscribeRecent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addRecentConversion(entry: RecentConversion): void {
  if (typeof window === "undefined") return;
  const current = getRecentSnapshot().filter((c) => !isSameConversion(c, entry));
  const updated = [entry, ...current].slice(0, MAX_RECENT);
  cache = updated;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — degrade silently
  }
  notify();
}
