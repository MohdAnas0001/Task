import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  type Currency,
  formatListedPrice,
  formatMoney,
} from "@/lib/pricing";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (raw: string) => string;
  formatAmount: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const setCurrency = useCallback((_next: Currency) => {
    // Only USD is supported
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency: "USD",
      setCurrency,
      formatPrice: (raw) => formatListedPrice(raw),
      formatAmount: (amount) => formatMoney(amount),
    }),
    [setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    return {
      currency: "USD" as Currency,
      setCurrency: () => {},
      formatPrice: (raw: string) => formatListedPrice(raw),
      formatAmount: (amount: number) => formatMoney(amount),
    };
  }
  return ctx;
}
