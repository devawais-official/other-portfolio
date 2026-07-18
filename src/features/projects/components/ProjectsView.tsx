import PageHeader from "@/components/ui/PageHeader";
import GenericFilterGrid, { FilterGridItem } from "@/components/ui/GenericFilterGrid";
import ProjectGridCard from "@/features/projects/components/ProjectGridCard";
import { getProjectsGridConfig } from "../configs/projects-config";
import { siteTheme } from "@/lib/site-config";
import { StandardPageLabels } from "@/utils/label-helper";
import { Project } from "@/features/projects/data";

interface ProjectsViewProps {
    projects: Project[];
    labels: StandardPageLabels;
    gridConfig: ReturnType<typeof getProjectsGridConfig>;
}

export default function ProjectsView({ projects, labels, gridConfig }: ProjectsViewProps) {
    const styles = siteTheme.projects; // 👈 Styles extraction for view layout

    const mappedGridItems: FilterGridItem[] = projects.map((project) => ({
        id: project.slug,
        filterValue: project.platform,
        content: <ProjectGridCard project={project} labels={gridConfig.labels} />,
    }));

    return (
        <>
            <PageHeader
                eyebrow={labels.title}
                title={labels.headerTitle}
                description={labels.headerDesc}
            />

            {/* dynamic padding classes extracted from theme */}
            <section className={styles.sectionPadding}>
                {/* dynamic layout container classes extracted from theme */}
                <div className={styles.container}>
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