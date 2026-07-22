
"use client";

import { useMemo } from "react";
import PageHeader from "@/components/ui/PageHeader";
import GenericFilterGrid, {
  type FilterGridItem,
} from "@/components/ui/GenericFilterGrid";
import ProjectGridCard from "@/features/projects/components/ProjectGridCard";
import type { getProjectsGridConfig } from "../configs/projects-config";
import type { StandardPageLabels } from "@/lib/utils";
import type { Project } from "@/features/projects/data";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ProjectsViewProps {
  projects: Project[];
  labels: StandardPageLabels;
  gridConfig: ReturnType<typeof getProjectsGridConfig>;
}

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function ProjectsView({
  projects,
  labels,
  gridConfig,
}: ProjectsViewProps) {
  const mappedGridItems: FilterGridItem[] = useMemo(
    () =>
      projects.map((project) => ({
        id: project.slug,
        filterValue: project.platform,
        content: (
          <ProjectGridCard project={project} labels={gridConfig.labels} />
        ),
      })),
    [projects, gridConfig.labels]
  );

  return (
    <>
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      <section className="section-pad pt-0">
        <div className="container-page">
          <GenericFilterGrid
            allLabel={gridConfig.allLabel}
            filters={gridConfig.filters}
            noItemsLabel={gridConfig.labels.noProjectsFound}
            resetFilterLabel={gridConfig.labels.backToAll}
            items={mappedGridItems}
          />
        </div>
      </section>
    </>
  );
}