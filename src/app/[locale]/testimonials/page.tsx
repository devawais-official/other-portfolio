import { getTranslationServer } from "@/i18n/i18n-server";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/utils/label-helper";
import TestimonialsView from "@/features/testimonials/components/TestimonialsView";
import type { Metadata } from "next";

interface TestimonialsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TestimonialsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "testimonials");
}

export default async function TestimonialsPage({ params }: TestimonialsPageProps) {
  const { locale } = await params;
  const translate = getTranslationServer(locale as any);

  const labels = getStandardPageLabels(translate, "testimonials");

  return <TestimonialsView labels={labels} />;
}