import Link from "next/link";
import Image from "next/image";
import StatCounter from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/button";
import { siteTheme } from "@/lib/site-config";
import { MappedHomeData } from "./HomeView";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { AndroidIcon, ArrowUpRightIcon, FlutterIcon, KotlinIcon } from "@/components/icons/icons";

interface HeroSectionProps {
    translate: (key: string) => string;
    homeData: MappedHomeData;
}
const stackBadges = [
    {
        name: "Kotlin",
        tooltip: "Kotlin",
        icon: <KotlinIcon className="w-3.5 h-3.5" role="img" aria-label="Kotlin Logo" />
    },
    {
        name: "Jetpack Compose",
        tooltip: "Compose",
        icon: <AndroidIcon className="w-3.5 h-3.5" role="img" aria-label="Jetpack Compose Logo" />
    },
    {
        name: "Flutter",
        tooltip: "Flutter",
        icon: <FlutterIcon className="w-3.5 h-3.5" role="img" aria-label="Flutter Logo" />
    }
];

const SQUIRCLE = "42% 58% 63% 37% / 41% 45% 55% 59%";

export default function HeroSection({ translate, homeData }: HeroSectionProps) {
    const { stats, availabilityText, contactPath, projectsPath } = homeData;
    const { hero: heroStyle } = siteTheme;

    return (
        <SectionWrapper className={heroStyle.wrapper}>
            <div className={heroStyle.layoutGrid}>

                {/* Left Side: Content Area */}
                <AnimatedSection className={heroStyle.contentCol}>
                    <p className={heroStyle.eyebrow}>
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping motion-reduce:animate-none rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        {availabilityText}
                    </p>

                    {/* Main Headings */}
                    <h1 className={heroStyle.heading}>
                        {translate("home.heading1")}
                        <br className="hidden sm:block" />
                        <span className={heroStyle.headingGradient}>
                            {" "}{translate("home.heading2")}
                        </span>
                    </h1>

                    {/* Paragraph description */}
                    <p className={heroStyle.description}>
                        {translate("home.description")}
                    </p>

                    {/* Action buttons */}
                    <div className={heroStyle.buttonContainer}>
                        <Button asChild variant="solid" className="w-full sm:w-auto">
                            <Link href={contactPath}>
                                {translate("home.buttonStart")} <ArrowUpRightIcon size={16} />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="w-full sm:w-auto">
                            <Link href={projectsPath}>
                                {translate("home.buttonView")}
                            </Link>
                        </Button>
                    </div>

                    {/* Stats segment */}
                    <div className={heroStyle.statsContainer}>
                        <StatCounter value={stats.yearsExperience} label={translate("home.stats.experience")} />
                        <StatCounter value={stats.projectsCompleted} label={translate("home.stats.completed")} />
                        <StatCounter value={stats.appsOnStores} label={translate("home.stats.stores")} />
                    </div>
                </AnimatedSection>

                {/* Right Side: Visual/Portrait Area */}
                <AnimatedSection delay={0.15} className={heroStyle.portraitCol}>
                    <div className={heroStyle.imageContainer}>

                        {/* Background Echo Shapes (Rendered dynamically using squircle theme variables) */}
                        <div
                            className={heroStyle.echoShape1}
                            style={{ borderRadius: SQUIRCLE }}
                            aria-hidden="true"
                        />
                        <div
                            className={heroStyle.echoShape2}
                            style={{ borderRadius: SQUIRCLE }}
                            aria-hidden="true"
                        />

                        {/* Masked Portrait Container */}
                        <div
                            className={heroStyle.imageMask}
                            style={{ borderRadius: SQUIRCLE }}
                        >
                            <Image
                                src="/images/dev-pic.avif"
                                alt="Muhammad Awais, mobile app developer"
                                fill
                                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 370px"
                                className={heroStyle.imageElement}
                                priority
                                fetchPriority="high"
                            />

                        </div>

                        {/* Container: 'mx-auto' and 'w-fit' keeps it centered and tightly wrapped around the badges */}
                        <div className="liquid-glass w-fit mx-auto flex items-center gap-4 px-6 py-3 rounded-full border border-primary/20 shadow-lg shadow-primary/5 relative z-20">
                            {stackBadges.map((b) => (
                                <div
                                    key={b.name}
                                    className={`${heroStyle.badgeItem} relative group z-10`}
                                    aria-label={`${b.name} technology`} /* Screen reader context */
                                >
                                    {/* React Icon element (ab isme automatic aria-hidden pass hoga) */}
                                    {b.icon}

                                    {/* Tooltip */}
                                    <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 pointer-events-none liquid-glass bg-gradient-to-br from-primary/10 via-bg/20 to-bg/50 backdrop-blur-xl border border-primary/20 text-[11px] font-medium text-ink px-2.5 py-1 rounded-lg shadow-lg shadow-primary/5 whitespace-nowrap z-30">
                                        {b.tooltip}

                                        {/* Tooltip Arrow */}
                                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary/80" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </SectionWrapper>
    );
}