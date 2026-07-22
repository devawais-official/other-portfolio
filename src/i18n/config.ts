import en from "./locales/en";
import ur from "./locales/ur";

export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type TranslationDictionary = typeof en;

type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export const translations: Record<Locale, DeepPartial<TranslationDictionary>> = {
    en, ur,
};

export function isLocale(value: string | undefined | null): value is Locale {
    return !!value && (locales as readonly string[]).includes(value);
}

export function resolveLocale(locale: string | undefined | null): Locale {
    return isLocale(locale) ? locale : defaultLocale;
}