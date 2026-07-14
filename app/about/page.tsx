import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/lib/siteConfig";
import portfolioData from "@/lib/portfolio.json";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

/* ─── Static config lifted outside component (Rule 1) ───────────────────────── */

const { experiences, stats } = portfolioData;
const { expertise } = siteConfig;

// Expertise group definitions — label is intentionally static (UI chrome, not i18n'd)
const EXPERTISE_GROUPS: { label: string; items: string[] }[] = [
  { label: "Languages", items: expertise.languages },
  { label: "Android", items: expertise.android },
  { label: "Multiplatform (KMP / CMP)", items: expertise.multiplatform },
  { label: "Flutter", items: expertise.flutter },
  { label: "Architecture", items: expertise.architecture },
  { label: "Tools", items: expertise.tools },
];

export const metadata: Metadata = {
  title: "About Muhammad Awais — Kotlin & Android Developer",
  description: "Learn more about Muhammad Awais, a senior developer building high-performance Kotlin Multiplatform, native Android, and Flutter apps.",
  alternates: { canonical: "/about" },
};

/* ─── AboutPage ──────────────────────────────────────────────────────────────── */

export default async function AboutPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  const tagline = locale === "ur" ? t("home.availability") : siteConfig.tagline;
  const availability = locale === "ur" ? t("home.availability") : siteConfig.availability;

  const statEntries = [
    { label: t("about.stats.experience"), value: stats.yearsExperience },
    { label: t("about.stats.completed"), value: stats.projectsCompleted },
    { label: t("about.stats.satisfied"), value: stats.clientsSatisfied },
    { label: t("about.stats.stores"), value: stats.appsOnStores },
  ];

  return (
    <>
      <PageHeader eyebrow={t("about.title")} title={t("about.headerTitle")} description={t("about.headerDesc")} />

      <section className="pb-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedSection className="card-surface p-6 sm:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 font-display text-xl font-bold text-white">
              MA
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">{siteConfig.name}</h2>
            <p className="text-sm text-muted">{tagline}</p>
            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("about.infoTitle")}</dt>
                <dd className="text-right">{t("about.infoLocation")}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("about.infoAvailability")}</dt>
                <dd className="text-right">{availability}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("about.infoFocus")}</dt>
                <dd className="text-right">{t("about.infoFocusVal")}</dd>
              </div>
            </dl>
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-6">
              {statEntries.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-semibold text-ink">{s.value}</p>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div>
            <SectionHeader
              eyebrow={t("about.expertiseTitle")}
              title={t("about.expertiseSubtitle")}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {EXPERTISE_GROUPS.map((group, i) => (
                <AnimatedSection key={group.label} delay={i * 0.05} className="card-surface p-5">
                  <h3 className="font-display text-sm font-semibold text-primary-light">{group.label}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">{item}</span>
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-pad border-t border-border bg-surface/30">
        <div className="container-page">
          <SectionHeader
            eyebrow={t("about.experienceTitle")}
            title={t("about.experienceSubtitle")}
            className="max-w-xl"
          />
          <div className="mt-12 space-y-8">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 0.06}
                className="card-surface grid gap-4 p-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:p-7">
                <div>
                  <p className="font-mono text-xs text-primary-light">{exp.duration}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted">{exp.company}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-muted">{exp.description}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
