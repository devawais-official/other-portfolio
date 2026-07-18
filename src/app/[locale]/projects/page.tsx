// src/app/[locale]/projects/page.tsx
import { getTranslationServer } from "@/i18n/i18n-server";
import { getStandardPageLabels } from "@/utils/label-helper";
import ProjectsView from "@/features/projects/components/ProjectsView";
import { getProjectsGridConfig } from "@/features/projects/configs/projects-config";
import { getProjectData } from "@/features/projects/data"; // 👈 YE IMPORT KARO
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "projects");
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const translate = getTranslationServer(locale as any);

  // 1. Transformation Logic: Data ko translate karke display model mein lao
  const projects = await getProjectData(locale as any);

  const labels = getStandardPageLabels(translate, "projects");
  const gridConfig = getProjectsGridConfig(translate);

  // 2. Ab translated 'projects' pass karo
  return <ProjectsView projects={projects} labels={labels} gridConfig={gridConfig} />;
}