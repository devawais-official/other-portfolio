import TechMarquee from "@/components/sections/TechMarquee";
import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturedProjects";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";

import { getHomeData } from "@/features/home/data";
import { Locale } from "next-intl";

type RawHomeData = ReturnType<typeof getHomeData>;

export type MappedHomeData = RawHomeData & {
    availabilityText: string;
    contactPath: string;
    projectsPath: string;
    testimonialsPath: string;
};

export interface ProcessStep {
    step: string;
    title: string;
    body: string;
}

interface HomeViewProps {
    locale: Locale;
    translate: (key: string) => string;
    homeData: MappedHomeData;
    processSteps: ProcessStep[];
}

export default function HomeView({ locale, translate, homeData, processSteps }: HomeViewProps) {
    return (
        <>
            {/* 1. Hero Landing Area */}
            <HeroSection translate={translate} homeData={homeData} />

            {/* 2. Marquee Banner */}
            <TechMarquee />

            {/* 3. Portfolio Grid */}
            <FeaturedProjects translate={translate} homeData={homeData} />

            {/* 4. Methodology & Flow Chart */}
            <ProcessSection translate={translate} processSteps={processSteps} />

            {/* 5. Client Feedbacks */}
            <TestimonialsSection translate={translate} homeData={homeData} />
        </>
    );
}