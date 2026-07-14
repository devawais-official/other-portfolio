import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";
import { getLocaleServer } from "@/lib/i18n-server";
import { I18nProvider } from "@/lib/i18n";
import SchemaMarkup from "@/components/SchemaMarkup";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Kotlin Multiplatform & Android Developer`,
    template: `%s — ${siteConfig.name}`,
  },
  description: "Hire Muhammad Awais, a senior mobile developer specializing in Kotlin Multiplatform and Android. View my portfolio and get in touch today!",
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — Kotlin Multiplatform & Android Developer`,
    description: "Hire Muhammad Awais, a senior mobile developer specializing in Kotlin Multiplatform and Android. View my portfolio and get in touch today!",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Kotlin Multiplatform & Android Developer`,
    description: "Hire Muhammad Awais, a senior mobile developer specializing in Kotlin Multiplatform and Android. View my portfolio and get in touch today!",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocaleServer();

  const personSchema = {
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "Pakistan"
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter
    ]
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <SchemaMarkup type="Person" data={personSchema} />
      </head>
      <body className="font-sans antialiased">
        <I18nProvider initialLocale={locale}>
          <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-glow" />
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
