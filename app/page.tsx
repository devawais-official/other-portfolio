import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GradientBlob from "@/components/GradientBlob";
import HeroComposeStack from "@/components/HeroComposeStack";
import StatCounter from "@/components/StatCounter";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/lib/data/projects";
import { testimonials } from "@/lib/data/testimonials";
import { siteConfig } from "@/lib/siteConfig";
import portfolioData from "@/lib/portfolio.json";
import { Button } from "@/components/ui/button";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";
import TechMarquee from "@/components/TechMarquee";

/* ─── Static config lifted out of component scope (Rule 1) ──────────────────── */

const { stats } = portfolioData;
const PROCESS_STEP_IDS = ["01", "02", "03", "04"] as const;
const featured = projects.slice(0, 3);
const featuredTestimonials = testimonials.slice(0, 3);

/* ─── HomePage ───────────────────────────────────────────────────────────────── */

export default async function HomePage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  const processSteps = PROCESS_STEP_IDS.map((step) => ({
    step,
    title: t(`home.processSteps.${step}.title`),
    body: t(`home.processSteps.${step}.body`),
  }));

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-14 sm:pt-20">
        <GradientBlob className="left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 bg-primary/20" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatedSection>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={14} /> {locale === "ur" ? t("home.availability") : siteConfig.availability}
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              {t("home.heading1")}
              <br className="hidden sm:block" />
              <span className="bg-brand-gradient bg-clip-text text-transparent">{t("home.heading2")}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted sm:text-lg">{t("home.description")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="solid">
                <Link href="/contact">{t("home.buttonStart")} <ArrowUpRight size={16} /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">{t("home.buttonView")}</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <StatCounter value={stats.yearsExperience} label={t("home.stats.experience")} />
              <StatCounter value={stats.projectsCompleted} label={t("home.stats.completed")} />
              <StatCounter value={stats.appsOnStores} label={t("home.stats.stores")} />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <HeroComposeStack />
          </AnimatedSection>
        </div>
      </section>

      <TechMarquee />

      {/* Featured Projects */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow={t("home.selectedWork")}
            title={t("home.recentProjects")}
            actionText={t("home.allProjectsLink")}
            actionHref="/projects"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-pad border-t border-border bg-surface/30">
        <div className="container-page">
          <SectionHeader
            eyebrow={t("home.processTitle")}
            title={t("home.processSubtitle")}
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.08} className="card-surface p-6">
                <span className="font-mono text-xs text-primary-light">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow={t("home.feedbackTitle")}
            title={t("home.feedbackSubtitle")}
            actionText={t("home.allTestimonialsLink")}
            actionHref="/testimonials"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((testimonial, i) => (
              <AnimatedSection key={testimonial.clientName} delay={i * 0.08}>
                <TestimonialCard t={testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
