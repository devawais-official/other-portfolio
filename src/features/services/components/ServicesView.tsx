// src/features/services/components/ServicesView.tsx
import PageHeader from "@/components/ui/PageHeader";
import ServiceCard from "./ServiceCard";
import { siteTheme } from "@/lib/site-config";
import type { StandardPageLabels } from "@/utils/label-helper";
import AnimatedSection from "@/components/layout/AnimatedSection";

interface ServicesViewProps {
    labels: StandardPageLabels;
    services: any[];
}

export default function ServicesView({ labels, services }: ServicesViewProps) {
    const styles = siteTheme.services;

    return (
        <>
            <PageHeader
                eyebrow={labels.title}
                title={labels.headerTitle}
                description={labels.headerDesc}
            />

            <section className={styles.sectionPadding}>
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <AnimatedSection key={service.id || index} delay={index * 0.08}>
                            <ServiceCard service={service} />
                        </AnimatedSection>
                    ))}
                </div>
            </section>

        </>
    );
}