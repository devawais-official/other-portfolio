import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import GradientBlob from "@/components/GradientBlob";
import SchemaMarkup from "@/components/SchemaMarkup";
import { projects } from "@/lib/data/projects";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  // Enforce 50-60 character length rule for meta title
  const rawTitle = `${project.title} — Mobile App Project Case Study`;
  const title = rawTitle.length > 60 ? rawTitle.substring(0, 60) : rawTitle;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${params.slug}`,
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const iosUrl = "iosUrl" in project ? (project.iosUrl as string | undefined) : undefined;
  const iosCtaText = "iosCtaText" in project ? (project.iosCtaText as string | undefined) : undefined;

  const appSchema = {
    name: project.title,
    description: project.summary,
    applicationCategory: project.category === "Healthcare" ? "HealthApplication" : "MobileApplication",
    operatingSystem: project.platform.includes("Android") ? "Android" : "iOS, Android",
    author: {
      "@type": "Person",
      "name": "Muhammad Awais"
    }
  };

  return (
    <>
      <SchemaMarkup type="SoftwareApplication" data={appSchema} />

      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <GradientBlob
          className="left-1/2 top-0 h-80 w-80 -translate-x-1/2 opacity-30"
          style={{ backgroundColor: project.accent }}
        />
        <div className="container-page relative">
          <AnimatedSection>
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <ArrowLeft size={15} /> {t("projects.backToProjects")}
            </Link>

            <div className="mt-6 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                {project.platform}
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                {project.category}
              </span>
            </div>

            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{project.summary}</p>

            <div className="mt-8 flex flex-wrap gap-8 border-t border-border pt-6 text-sm">
              <div>
                <p className="text-muted">{t("projects.techStack")}</p>
                <p className="mt-1 max-w-sm font-medium">{project.tech.join(", ")}</p>
              </div>
            </div>

            {(project.url || iosUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary min-h-[44px]">
                    {project.ctaText || t("projects.ctaPlayStore")} <ArrowUpRight size={16} />
                  </a>
                )}
                {iosUrl && (
                  <a href={iosUrl} target="_blank" rel="noreferrer" className="btn-secondary min-h-[44px]">
                    {iosCtaText || t("projects.ctaAppStore")} <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatedSection>
            <p className="text-base leading-relaxed text-muted">{project.description}</p>
          </AnimatedSection>

          <div className="space-y-6">
            {project.highlights && project.highlights.length > 0 && (
              <AnimatedSection className="card-surface p-6">
                <p className="eyebrow">{t("projects.highlights")}</p>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: project.accent }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.1} className="card-surface p-6">
              <p className="eyebrow">{t("projects.techStack")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted"
                    style={{ borderColor: `${project.accent}40` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="container-page flex items-center justify-between">
          <span className="text-sm text-muted">{t("projects.nextProject")}</span>
          <Link href={`/projects/${next.slug}`} className="inline-flex items-center gap-1.5 font-display text-lg font-semibold text-ink hover:text-primary-light">
            {next.title} <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
