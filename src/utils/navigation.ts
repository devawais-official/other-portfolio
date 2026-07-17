import { Locale } from "@/i18n/i18n-provider";

export function getLocalizedPath(path: string, locale: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
}