"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import en from "./locales/en.json";
import ur from "./locales/ur.json";

export type Locale = "en" | "ur";

const translations: Record<Locale, any> = { en, ur };

interface I18nContextType {
  locale: Locale;
  changeLocale: (newLocale: Locale) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const router = useRouter();

  // Keep state in sync with cookie changes
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    const cookieLocale = match ? (match[1] as Locale) : initialLocale;
    if (translations[cookieLocale] && cookieLocale !== locale) {
      setLocale(cookieLocale);
    }
  }, [initialLocale, locale]);

  function changeLocale(newLocale: Locale) {
    if (!translations[newLocale]) return;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setLocale(newLocale);
    router.refresh();
    // Sometimes router.refresh() doesn't update everything if layout is static.
    // A quick reload ensures the HTML lang attribute and document update correctly.
    window.location.reload();
  }

  function t(key: string, replacements?: Record<string, string>): string {
    const data = translations[locale];
    const parts = key.split(".");
    let current: any = data;

    for (const part of parts) {
      if (!current || current[part] === undefined) {
        // Fallback to English if key is missing in Urdu
        if (locale === "ur") {
          return getEnglishFallback(key, replacements);
        }
        return key;
      }
      current = current[part];
    }

    if (typeof current !== "string") return key;

    let result = current;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{${k}}`, "g"), v);
      });
    }
    return result;
  }

  function getEnglishFallback(key: string, replacements?: Record<string, string>): string {
    const parts = key.split(".");
    let current: any = en;
    for (const part of parts) {
      if (!current || current[part] === undefined) return key;
      current = current[part];
    }
    if (typeof current !== "string") return key;
    let result = current;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{${k}}`, "g"), v);
      });
    }
    return result;
  }

  return (
    <I18nContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
