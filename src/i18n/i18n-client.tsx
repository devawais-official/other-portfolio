"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { locales, Locale } from "./config";

interface I18nContextType {
    locale: Locale;
    changeLocale: (newLocale: Locale) => void;
    translate: (key: string, options?: { returnObjects?: boolean } | Record<string, string>) => any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
    children,
    initialLocale,
    pageDictionary, // ⚡ FIX: Ab translations yahan direct server se ayengi, static import nahi hongi!
}: {
    children: React.ReactNode;
    initialLocale: Locale;
    pageDictionary: any;
}) {
    const [locale, setLocale] = useState<Locale>(initialLocale);
    const router = useRouter();

    useEffect(() => {
        requestAnimationFrame(() => {
            const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
            const cookieLocale = match ? (match[1] as Locale) : initialLocale;
            if (locales.includes(cookieLocale) && cookieLocale !== locale) {
                setLocale(cookieLocale);
            }
        });
    }, [initialLocale, locale]);

    function changeLocale(newLocale: Locale) {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        setLocale(newLocale);
        router.refresh();
        window.location.reload();
    }

    function getNestedValue(obj: any, path: string): any {
        const parts = path.split(".");
        let current = obj;
        for (const part of parts) {
            if (!current || current[part] === undefined) return undefined;
            current = current[part];
        }
        return current;
    }

    function formatString(template: string, options?: Record<string, string>): string {
        if (!options) return template;
        let result = template;
        Object.entries(options).forEach(([k, v]) => {
            result = result.replace(new RegExp(`{${k}}`, "g"), v);
        });
        return result;
    }

    function translate(key: string, options?: { returnObjects?: boolean } | Record<string, string>): any {
        // ⚡ FIX: Ab local state se file dictionary lookup nahi hoga, dynamic client page dict se hoga
        let value = getNestedValue(pageDictionary, key);
        if (value === undefined) return key;

        const returnObjects = options && 'returnObjects' in options ? options.returnObjects : false;
        if (returnObjects) return value;

        if (typeof value !== "string") return key;
        if (options && !('returnObjects' in options)) {
            return formatString(value, options as Record<string, string>);
        }

        return value;
    }

    return (
        <I18nContext.Provider value={{ locale, changeLocale, translate }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) throw new Error("useI18n must be used within an I18nProvider");
    return context;
}