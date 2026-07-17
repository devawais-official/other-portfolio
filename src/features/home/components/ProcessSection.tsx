import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { siteTheme } from "@/lib/site-config";
import { ProcessStep } from "./HomeView";

interface ProcessSectionProps {
    translate: (key: string) => string;
    processSteps: ProcessStep[];
}

export default function ProcessSection({ translate, processSteps }: ProcessSectionProps) {
    return (
        <SectionWrapper
            // bg-surface/30 hata dein, taake blobs ka asar cards ke peeche dikhe
            className="section-pad border-t border-border"

        >
            <div className="container-page">
                <SectionHeader
                    eyebrow={translate("home.processTitle")}
                    title={translate("home.processSubtitle")}
                    className="max-w-2xl"
                />
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map((item, index) => (
                        <AnimatedSection
                            key={item.step}
                            delay={index * 0.08}
                            className="liquid-glass p-6"
                        >
                            <span className="font-mono text-xs text-primary-light font-bold">
                                {item.step}
                            </span>
                            <h3 className="mt-3 font-display text-lg font-semibold">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                {item.body}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}