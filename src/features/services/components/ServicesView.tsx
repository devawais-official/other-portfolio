// src/features/services/components/ServicesView.tsx
"use client";

import PageHeader from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import ServiceCard from "./ServiceCard";
import type { StandardPageLabels } from "@/lib/utils";
import type { LocalizedServiceItem } from "../configs/services-config";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ServicesViewProps {
  labels: StandardPageLabels;
  services: LocalizedServiceItem[];
}

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function ServicesView({ labels, services }: ServicesViewProps) {
  return (
    <>
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      <section className="section-pad pt-0">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}