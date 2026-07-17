import SectionHeader from "@/components/ui/SectionHeader";
import ProjectGridCard from "@/features/projects/components/ProjectGridCard"; // 👈 Centralized import
import { getProjectsGridConfig } from "@/features/projects/configs/projects-config";
import { MappedHomeData } from "./HomeView";
import AnimatedSection from "@/components/layout/AnimatedSection";
import SectionWrapper from "@/components/layout/SectionWrapper";

interface FeaturedProjectsProps {
    translate: (key: string) => string;
    homeData: MappedHomeData;
}

export default function FeaturedProjects({ translate, homeData }: FeaturedProjectsProps) {
    const { featuredProjects, projectsPath } = homeData;
    const gridConfig = getProjectsGridConfig(translate);

    return (
        <SectionWrapper className="section-pad" showBlobs={false}>
            <div className="container-page">
                <SectionHeader
                    eyebrow={translate("home.selectedWork")}
                    title={translate("home.recentProjects")}
                    actionText={translate("home.allProjectsLink")}
                    actionHref={projectsPath}
                />
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project, index) => (
                        <AnimatedSection key={project.slug} delay={index * 0.08}>
                            <ProjectGridCard project={project} labels={gridConfig.labels} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}