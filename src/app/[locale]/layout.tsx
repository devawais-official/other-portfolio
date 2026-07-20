import "@/styles/globals.css";

import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Header from "@/components/layout/Header";

import dynamic from "next/dynamic";

import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { siteTheme } from "@/lib/site-config";
import { getMetadata, getCombinedSchemaData, rtlLocales } from "@/lib/seo";
import { I18nProvider } from "@/i18n/i18n-client";
import { getDictionaryServer } from "@/i18n/i18n-server";
import { Locale, locales, defaultLocale } from "@/i18n/config";

const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const pageDictionary = getDictionaryServer(locale);
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

  const htmlClassNames = `${fontClasses} ${siteTheme.htmlStyles}`;

  // ⚡ FIX: Layout level par hi localized paths generate kar liye
  const homeDataMock = {
    contactPath: `/${locale}/contact`,
    projectsPath: `/${locale}/projects`,
  };
  const schemaData = getCombinedSchemaData();
  return (
    <html lang={locale} dir={dir} className={htmlClassNames}
      data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <SchemaMarkup type="Person" data={schemaData} />
      </head>
      <body className={siteTheme.bodyStyles}>
        <I18nProvider initialLocale={locale} pageDictionary={pageDictionary}>
          <div className={siteTheme.glowStyles} />

          <Header />
          <main className="flex-grow">{children}</main>

          {/* ⚡ FIX: Ab yahan homeData prop pass kar di */}
          <CTASection homeData={homeDataMock as any} />

          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}