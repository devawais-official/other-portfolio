import type { Metadata } from "next";
import { Smartphone, Cpu, Zap, GitBranch, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/data/services";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

/* ─── Static config lifted outside component (Rule 1) ───────────────────────── */

const iconMap: Record<string, LucideIcon> = { Smartphone, Cpu, Zap, GitBranch };

/* ─── Fallback-safe translation helper (Rule 2: Clean fallback abstraction) ─── */

const localizeService = (t: (k: string) => string, id: string | number, fallback: string, field: "title" | "description") => {
  const key = `services.items.${id}.${field}`;
  const val = t(key);
  return val.startsWith("services.items") ? fallback : val;
};

export const metadata: Metadata = {
  title: "Android & Kotlin Multiplatform Development Services",
  description: "Senior mobile application engineering services: Jetpack Compose, Kotlin Multiplatform, and Flutter development.",
  alternates: { canonical: "/services" },
};

/* ─── ServicesPage ───────────────────────────────────────────────────────────── */

export default async function ServicesPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  return (
    <>
      <PageHeader eyebrow={t("services.title")} title={t("services.headerTitle")} description={t("services.headerDesc")} />

      <section className="pb-24">
        <div className="container-page grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Smartphone;
            return (
              <AnimatedSection key={service.id} delay={i * 0.08} className="card-surface p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold">
                  {localizeService(t, service.id, service.title, "title")}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {localizeService(t, service.id, service.description, "description")}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted">{tech}</span>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
