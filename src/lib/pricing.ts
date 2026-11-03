export type Currency = "USD" | "INR";

const STORAGE_KEY = "certcia_currency";
export const FALLBACK_INR_PER_USD = 1;

export function parseInrAmount(raw: string): number | null {
  if (!raw || /^free$/i.test(raw.trim())) return null;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export const parseAmount = parseInrAmount;

export function formatMoney(
  amount: number,
  _currency: Currency = "USD",
  _inrPerUsd = FALLBACK_INR_PER_USD,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatListedPrice(
  raw: string,
  _currency: Currency = "USD",
  _inrPerUsd = FALLBACK_INR_PER_USD,
): string {
  const amount = parseInrAmount(raw);
  if (amount === null) return "Free";
  return formatMoney(amount);
}

export function readStoredCurrency(): Currency {
  return "USD";
}

export function writeStoredCurrency(_currency: Currency) {
  // Always USD
}

export function readCachedFx(): number | null {
  return null;
}

export function writeCachedFx(_inrPerUsd: number) {}

export async function fetchLiveInrPerUsd(): Promise<number | null> {
  return null;
}

export function currencyFromTimezone(): Currency {
  return "USD";
}

export async function currencyFromIp(): Promise<Currency> {
  return "USD";
}
