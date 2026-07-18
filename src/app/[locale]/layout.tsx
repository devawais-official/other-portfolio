import "@/styles/globals.css";

import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";

import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { siteTheme } from "@/lib/site-config";
import { getMetadata, personSchemaData, rtlLocales } from "@/lib/seo";
import { I18nProvider } from "@/i18n/i18n-provider";
import { Locale, locales, defaultLocale } from "@/i18n/config";

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

  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

  const htmlClassNames = `${fontClasses} ${siteTheme.htmlStyles}`;

  return (
    <html lang={locale} dir={dir} className={htmlClassNames}
      data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <SchemaMarkup type="Person" data={personSchemaData} />
      </head>
      <body className={siteTheme.bodyStyles}>
        <I18nProvider initialLocale={locale}>
          <div className={siteTheme.glowStyles} />

          <Header />
          <main className="flex-grow">{children}</main>
          <CTASection />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}