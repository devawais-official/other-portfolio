"use client";

import PageHeader from "@/components/ui/PageHeader";
import TestimonialCard from "@/features/testimonials/components/TestimonialCard";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { siteTheme } from "@/lib/site-config";
import type { StandardPageLabels } from "@/utils/label-helper";
import type { Testimonial } from "@/features/testimonials/types";

interface TestimonialsViewProps {
    labels: StandardPageLabels;
    testimonials: Testimonial[]; // Yeh sahi hai
}

// 2. Destructure 'testimonials' here
export default function TestimonialsView({ labels, testimonials }: TestimonialsViewProps) {
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
                    {/* 3. Ab yeh prop wala testimonials array use karega */}
                    {testimonials.map((testimonial, i) => (
                        <AnimatedSection key={testimonial.slug} delay={i * 0.06}>
                            <TestimonialCard testimonial={testimonial} />
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </>
    );
}