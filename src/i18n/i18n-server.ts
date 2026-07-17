import { cookies } from "next/headers";
import { locales, Locale, defaultLocale, translations } from "./config";



export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value as Locale;
    return locales.includes(locale) ? locale : defaultLocale;
  } catch (err) {
    return defaultLocale;
  }
}

export function getTranslationServer(locale: Locale) {
  const currentLocale = translations[locale] ? locale : defaultLocale;
  const data = translations[currentLocale];

  return function t(key: string, replacements?: Record<string, string>): string {
    const parts = key.split(".");
    let current: any = data;

    for (const part of parts) {
      if (!current || current[part] === undefined) {
        if (currentLocale !== defaultLocale) {
          return getTranslationServer(defaultLocale)(key, replacements);
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
  };
}