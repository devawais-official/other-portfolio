// src/lib/metadata.ts
import type { Metadata } from "next";
import { getTranslationServer } from "@/i18n/i18n-server";
import { pageMetaDefaults } from "./site-config";
import { buildSharedFields } from "./seo";
import { locales, Locale } from "@/i18n/config";

export function generatePageMetadata(
    locale: string,
    pageKey: keyof typeof pageMetaDefaults
): Metadata {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const config = pageMetaDefaults[pageKey];
    const translate = getTranslationServer(resolvedLocale);

    const titleKey = `${config.keyPrefix}.metaTitle`;
    const descKey = `${config.keyPrefix}.metaDesc`;
    const keywordsKey = `${config.keyPrefix}.metaKeywords`;

    const title = translate(titleKey);
    const description = translate(descKey);
    const keywordsRaw = translate(keywordsKey);

    // Defensive checks: getTranslationServer returns the key itself when missing,
    // so this catches un-translated locale files instead of shipping a raw key as the title
    if (!title || title === titleKey) {
        console.warn(`[SEO] Missing translation: ${titleKey} for locale "${resolvedLocale}"`);
    }
    if (!description || description === descKey) {
        console.warn(`[SEO] Missing translation: ${descKey} for locale "${resolvedLocale}"`);
    }

    const keywords = Array.isArray(keywordsRaw)
        ? keywordsRaw
        : typeof keywordsRaw === "string" && keywordsRaw !== keywordsKey
            ? keywordsRaw.split(",").map((k) => k.trim())
            : [];

    const path = config.slug === "home" ? "" : `/${config.slug}`;

    return {
        ...buildSharedFields(resolvedLocale, path, title, description),
        title,
        keywords,
    };
}