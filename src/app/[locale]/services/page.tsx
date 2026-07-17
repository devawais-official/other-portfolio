// src/app/[locale]/services/page.tsx
import { getTranslationServer } from "@/i18n/i18n-server";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/utils/label-helper";
import ServicesView from "@/features/services/components/ServicesView";
import { getLocalizedServices } from "@/features/services/configs/services-config";
import { services as rawServices } from "@/data";
import type { Metadata } from "next";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const translate = getTranslationServer(locale as any);

  const labels = getStandardPageLabels(translate, "services");

  const localizedServices = getLocalizedServices(translate, rawServices);

  return <ServicesView labels={labels} services={localizedServices} />;
}