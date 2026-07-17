"use client";

import PageHeader from "@/components/ui/PageHeader";
import TestimonialCard from "@/features/testimonials/components/TestimonialCard";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { testimonials } from "@/data";
import { siteTheme } from "@/lib/theme-config";
import type { StandardPageLabels } from "@/utils/label-helper";

interface TestimonialsViewProps {
    labels: StandardPageLabels;
}

export default function TestimonialsView({ labels }: TestimonialsViewProps) {
    const sectionPadding = siteTheme.projects?.sectionPadding ?? "pb-24";

    return (
        <>
            <PageHeader
                eyebrow={labels.title}
                title={labels.headerTitle}
                description={labels.headerDesc}
            />

            <section className={sectionPadding}>
                <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <AnimatedSection key={testimonial.clientName} delay={i * 0.06}>
                            <TestimonialCard testimonial={testimonial} />
                        </AnimatedSection>
                    ))}
                </div>
            </section>

        </>
    );
}