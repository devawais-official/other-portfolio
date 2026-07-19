// src/app/[locale]/contact/page.tsx
import { getTranslationServer } from "@/i18n/i18n-server";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/utils/label-helper";
import ContactView from "@/features/contact/components/ContactView";
import type { Metadata } from "next";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "contact");
}
export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const translate = getTranslationServer(locale as any);

  const resolvedLocation = translate("aboutData.infoLocation") || "Lahore, Pakistan";
  const labels = getStandardPageLabels(translate, "contact");

  return <ContactView labels={labels} location={resolvedLocation} />;
}