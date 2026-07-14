import { cookies } from "next/headers";
import en from "./locales/en.json";
import ur from "./locales/ur.json";

export type Locale = "en" | "ur";

const translations: Record<Locale, any> = { en, ur };

// 1. Is function ko async banaya taake cookies() ko await kiya ja sake
export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value as Locale;
    return translations[locale] ? locale : "en";
  } catch (err) {
    // Fallback if called outside request context (e.g. static generation pre-render)
    return "en";
  }
}

export function getTranslationServer(locale: Locale) {
  const data = translations[locale];

  return function t(key: string, replacements?: Record<string, string>): string {
    const parts = key.split(".");
    let current: any = data;
    for (const part of parts) {
      if (!current || current[part] === undefined) {
        // Fallback to English if Urdu key is missing
        if (locale === "ur") {
          return getTranslationServer("en")(key, replacements);
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