import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectsFilterGrid from "@/components/ProjectsFilterGrid";
import CTASection from "@/components/CTASection";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Shipped Android & Kotlin Multiplatform Projects",
  description: "Browse the mobile portfolio of Muhammad Awais, showcasing native Android (Kotlin), KMP, and Flutter production applications.",
  alternates: {
    canonical: "/projects",
  }
};

export default async function ProjectsPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("projects.title")}
        title={t("projects.headerTitle")}
        description={t("projects.headerDesc")}
      />
      <section className="pb-24">
        <div className="container-page">
          <ProjectsFilterGrid />
        </div>
      </section>
      <CTASection />
    </>
  );
}
