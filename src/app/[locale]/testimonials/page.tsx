import { getTranslationServer } from "@/i18n/i18n-server";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/utils/label-helper";
import TestimonialsView from "@/features/testimonials/components/TestimonialsView";
import type { Metadata } from "next";
import { testimonials as rawTestimonials } from "@/data";
interface TestimonialsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TestimonialsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "testimonials");
}
export default async function TestimonialsPage({ params }: TestimonialsPageProps) {
  const { locale } = await params;
  const t = getTranslationServer(locale as any);
  const labels = getStandardPageLabels(t, "testimonials");

  const testimonials = rawTestimonials.map(item => {
    const key = `testimonialsData.${item.slug}.message`;
    const msg = t(key);

    return {
      ...item,
      message: msg
    };
  });
  return <TestimonialsView labels={labels} testimonials={testimonials} />;
}