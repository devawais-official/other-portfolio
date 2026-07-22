import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { locales, Locale } from "@/i18n/config";

const localizedDefaults: Record<Locale, { title: string; description: string }> = {
    en: {
        title: `Muhammad Awais — Senior Mobile App Developer (Android, Flutter, KMP)`,
        description:
            "Looking for a Senior Mobile Developer? Hire Muhammad Awais (Devawais), a specialist in Kotlin Multiplatform, Android Development, Flutter, and Clean Architecture.",
    },
    ur: {
        title: `محمد اویس — سینئر موبائل ایپ ڈویلپر (اینڈرائیڈ ، فلاتر)`,
        description: "محمد اویس (Devawais) کا پورٹ فولیو — سینئر موبائل اور فلٹر ایپ ڈویلپر۔",
    },

};

const ogLocaleMap: Record<Locale, string> = {
    en: "en_US",
    ur: "ur_PK",
};

export const rtlLocales: Locale[] = ["ur"];

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
            siteName: "Muhammad Awais Portfolio",
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
    return "en";
}

export function getMetadata(locale: string): Metadata {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const { title, description } = localizedDefaults[resolvedLocale];

    // SEO-Rich Global Keywords list taake har page par SEO boost mile
    const advancedKeywords = [
        "Muhammad Awais", "Awais", "Devawais", "awaisdevm",
        "Mobile Dev", "Mobile Developer", "Senior Mobile Developer", "Mobile App Architect",
        "Android Developer", "Senior Android Developer", "Kotlin Multiplatform", "KMP Developer",
        "Flutter Developer", "Senior Flutter Developer", "Flutter Expert", "vibe coding", "indie dev",
        "Clean Architecture", "MVI Architecture", "Jetpack Compose", "Android Lahore"
    ];

    return {
        ...buildSharedFields(resolvedLocale, "", title, description),
        title,
        keywords: advancedKeywords,
    };
}

// ⚡ HIGH SEO OPTIMIZATION: Combined WebSite & Person Schema Generator
export const getCombinedSchemaData = () => {
    return [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Muhammad Awais — Mobile App Developer Portfolio",
            "alternateName": ["Devawais", "awaisdevm", "Muhammad Awais", "devawais-official"],
            "url": siteConfig.url,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteConfig.url}/?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Muhammad Awais",
            "alternateName": ["Devawais", "awaisdevm", "Awais"],
            "jobTitle": "Senior Mobile App Developer & Architect",
            "url": siteConfig.url,
            "email": siteConfig.email,
            "image": `${siteConfig.url}/profile.jpg`,
            "gender": "Male",
            "description": "Senior Mobile Developer specializing in Android, Flutter, Kotlin Multiplatform, and Clean Architecture with a proven track record of building scalable mobile applications.",
            "nationality": {
                "@type": "Country",
                "name": "Pakistan"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lahore",
                "addressCountry": "Pakistan",
            },
            "knowsAbout": [
                "Mobile Dev",
                "Mobile Developer",
                "Android Development",
                "Kotlin Multiplatform",
                "Flutter",
                "Jetpack Compose",
                "Clean Architecture",
                "MVI Architecture",
                "Mobile App Architecture",
                "Dart",
                "Kotlin",
                "Java",
                "CI/CD Pipelines"
            ],
            "worksFor": [
                { "@type": "Organization", "name": "Netroots Technologies" },
                { "@type": "Organization", "name": "Healthwire Pvt Ltd" },
                { "@type": "Organization", "name": "Egora Pvt Ltd" },
                { "@type": "Organization", "name": "DonGamers" }
            ],
            "sameAs": [
                siteConfig.socialBaseUrls.github && `${siteConfig.socialBaseUrls.github}${siteConfig.usernames.github}`,
                siteConfig.socialBaseUrls.linkedin && `${siteConfig.socialBaseUrls.linkedin}${siteConfig.usernames.linkedin}`,
                siteConfig.socialBaseUrls.twitter && `${siteConfig.socialBaseUrls.twitter}${siteConfig.usernames.twitter}`
            ].filter((url): url is string => Boolean(url)),
        }
    ];
};