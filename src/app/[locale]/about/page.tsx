// src/app/[locale]/about/page.tsx
import { getTranslationServer } from "@/i18n/i18n-server";
import { getAboutData } from "@/features/about/data";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/utils/label-helper";
import AboutView from "@/features/about/components/AboutView";
import type { Metadata } from "next";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const translate = getTranslationServer(locale as any);
  const data = getAboutData();

  const labels = getStandardPageLabels(translate, "about");

  const tagline = translate("aboutData.role");
  const availability = translate("aboutData.availability");

  return (
    <AboutView
      data={data}
      labels={labels}
      tagline={tagline}
      availability={availability}
    />
  );
}