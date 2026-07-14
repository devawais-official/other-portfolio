import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import { testimonials } from "@/lib/data/testimonials";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Client Testimonials — Muhammad Awais Mobile Developer",
  description: "Read reviews and testimonials from startup founders and CTOs who worked with Muhammad Awais on mobile applications.",
  alternates: {
    canonical: "/testimonials",
  }
};

export default async function TestimonialsPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("testimonials.title")}
        title={t("testimonials.headerTitle")}
        description={t("testimonials.headerDesc")}
      />

      <section className="pb-24">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={testimonial.clientName} delay={i * 0.06}>
              <TestimonialCard t={testimonial} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
