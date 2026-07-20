import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { ProcessStep } from "./HomeView";
import { processCardTheme } from "@/styles/theme/components";
// 🎯 FIX 1: Apni theme file ka sahi path yahan check kar lein (jaise @/config/theme ya jahan bhi store hai)

interface ProcessSectionProps {
    translate: (key: string) => string;
    processSteps: ProcessStep[];
}

export default function ProcessSection({ translate, processSteps }: ProcessSectionProps) {
    // Shorthand reference to prevent messy code in return block
    const styles = processCardTheme;

    return (
        <SectionWrapper
            // bg-surface/30 hata diya taake background blobs cards ke peeche se behtareen chamkein
            className="section-pad border-t border-[rgba(var(--color-border),0.1)]"
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
                            // 🎯 FIX 2: Hardcoded "liquid-glass p-6" ko optimized theme object class se replace kiya
                            className={styles.card}
                        >
                            {/* Ambient background hover glow matching premium previews */}
                            {styles.hoverGlow && <div className={styles.hoverGlow} />}

                            {/* 🎯 FIX 3: Step Numbers (01, 02) Contrast Pop */}
                            <span className={styles.stepNumber}>
                                {item.step}
                            </span>

                            {/* 🎯 FIX 4: Title Typography Alignment */}
                            <h3 className={styles.title}>
                                {item.title}
                            </h3>

                            {/* 🎯 FIX 5: Balanced Body/Description Text */}
                            <p className={styles.description}>
                                {item.body}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}