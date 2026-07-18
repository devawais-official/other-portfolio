import type { Metadata } from "next";
import { siteConfig, pageMetaDefaults } from "./site-config";
import { locales, Locale } from "@/i18n/config";

const localizedDefaults: Record<Locale, { title: string; description: string }> = {
    en: {
        title: `${siteConfig.name} — Kotlin Multiplatform & Android Developer`,
        description:
            "Hire Muhammad Awais, a senior mobile developer specializing in Kotlin Multiplatform, Android, and Flutter.",
    },
    ur: {
        title: `${siteConfig.name} — کوٹلن اور اینڈرائیڈ ڈویلپر`,
        description: "محمد اویس کا پورٹ فولیو — سینئر موبائل ڈویلپر۔",
    },
    ar: {
        title: `${siteConfig.name} — مطوّر كوتلن وأندرويد`,
        description: "محفظة أعمال محمد أويس — مطور تطبيقات جوال أول متخصص في أندرويد وفلاتر.",
    },
    fr: {
        title: `${siteConfig.name} — Développeur Kotlin Multiplatform & Android`,
        description:
            "Engagez Muhammad Awais, développeur mobile senior spécialisé en Kotlin Multiplatform, Android et Flutter.",
    },
    tr: {
        title: `${siteConfig.name} — Kotlin Multiplatform ve Android Geliştiricisi`,
        description:
            "Kotlin Multiplatform, Android ve Flutter konularında uzman kıdemli mobil geliştirici Muhammad Awais.",
    },
};

// og:locale expects full locale codes, not just the language
const ogLocaleMap: Record<Locale, string> = {
    en: "en_US",
    ur: "ur_PK",
    ar: "ar_SA",
    fr: "fr_FR",
    tr: "tr_TR",
};

export const rtlLocales: Locale[] = ["ur", "ar"];

export function buildSharedFields(locale: Locale, path: string, title: string, description: string): Metadata {
    const languageAlternates = Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])
    );

    return {
        metadataBase: new URL(siteConfig.url),
        description,
        alternates: {
            canonical: `${siteConfig.url}/${locale}${path}`,
            languages: {
                ...languageAlternates,
                "x-default": `${siteConfig.url}/${defaultLocaleFallback()}${path}`,
            },
        },
        openGraph: {
            type: "website",
            url: `${siteConfig.url}/${locale}${path}`,
            title,
            description,
            siteName: siteConfig.name,
            locale: ogLocaleMap[locale],
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteConfig.url}/og-image.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
            },
        },
        icons: {
            icon: "/favicon.svg",
        },
        other: {
            "color-scheme": "dark only",
        },
    };
}

function defaultLocaleFallback() {
    // kept as a function so it can pull from i18n/config's defaultLocale directly if preferred
    return "en";
}

// Root layout metadata (site-wide default, used when a page has no override)
export function getMetadata(locale: string): Metadata {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const { title, description } = localizedDefaults[resolvedLocale];

    return {
        ...buildSharedFields(resolvedLocale, "", title, description),
        title,
        keywords: siteConfig.keywords,
    };
}



export const personSchemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: "Devawais",
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/profile.jpg`,
    address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "Pakistan",
    },
    knowsAbout: [
        "Android Development",
        "Kotlin Multiplatform",
        "Flutter",
        "Jetpack Compose",
        "Clean Architecture",
        "MVI Architecture",
    ],
    sameAs: [
        siteConfig.socialBaseUrls.github && `${siteConfig.socialBaseUrls.github}${siteConfig.usernames.github}`,
        siteConfig.socialBaseUrls.linkedin && `${siteConfig.socialBaseUrls.linkedin}${siteConfig.usernames.linkedin}`,
        siteConfig.socialBaseUrls.twitter && `${siteConfig.socialBaseUrls.twitter}${siteConfig.usernames.twitter}`].filter(
            (url): url is string => Boolean(url)
        ),
};