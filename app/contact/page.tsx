import type { Metadata } from "next";
import { Mail, MapPin, Clock, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/siteConfig";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

/* ─── Static info items lifted out of component (Rule 1) ────────────────────── */

type InfoItem = { icon: LucideIcon; content: React.ReactNode };

export const metadata: Metadata = {
  title: "Contact Muhammad Awais — Hire Mobile Developer",
  description: "Get in touch with Muhammad Awais about Android Native or Kotlin Multiplatform (KMP) consulting projects. Let's build together!",
  alternates: { canonical: "/contact" },
};

/* ─── ContactPage ────────────────────────────────────────────────────────────── */

export default async function ContactPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  // Cast safely; fallback to empty array so map is always safe (Rule 2)
  const tips = Array.isArray(t("contact.beforeWriteTips"))
    ? (t("contact.beforeWriteTips") as unknown as string[])
    : [];

  const infoItems: InfoItem[] = [
    { icon: Mail, content: <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-primary-light">{siteConfig.email}</a> },
    { icon: MapPin, content: <span className="text-muted">{t("about.infoLocation")}</span> },
    { icon: Clock, content: <span className="text-muted">{t("contact.replyNotice")}</span> },
  ];

  return (
    <>
      <PageHeader eyebrow={t("contact.title")} title={t("contact.headerTitle")} description={t("contact.headerDesc")} />

      <section className="pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <AnimatedSection className="space-y-6">
            {/* Direct contact info */}
            <div className="card-surface p-6">
              <p className="eyebrow">{t("contact.directTitle")}</p>
              <div className="mt-4 space-y-4 text-sm">
                {infoItems.map(({ icon: Icon, content }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon size={16} className="text-primary-light" />
                    {content}
                  </div>
                ))}
              </div>
            </div>

            {/* Before-you-write tips */}
            <div className="card-surface p-6">
              <p className="eyebrow">{t("contact.beforeWriteTitle")}</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {tips.map((tip, idx) => <li key={idx}>· {tip}</li>)}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
