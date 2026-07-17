import en from "./locales/en.json";
import ur from "./locales/ur.json";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";
import tr from "./locales/tr.json";

// 1. Array banaya taake runtime check bhi ho sake
export const locales = ["en", "ur", "ar", "fr", "tr"] as const;

// 2. Union Type extract ki: "en" | "ur"
export type Locale = (typeof locales)[number];

// 3. Default locale configuration
export const defaultLocale: Locale = "en";

// 4. Import translations here (ek hi jagah load honge)

export const translations: Record<Locale, any> = { en, ur, ar, fr, tr };