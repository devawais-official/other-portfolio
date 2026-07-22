import type { TranslateFn } from "@/i18n/translation-core";

export function createSafeTranslate(translate: TranslateFn) {
    return (key: string, fallback: string): string => {
        const value = translate<string>(key);
        return value === key ? fallback : value;
    };
}