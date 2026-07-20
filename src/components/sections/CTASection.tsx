"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useI18n } from "@/i18n/i18n-client";
import AnimatedSection from "../layout/AnimatedSection";
import { ArrowUpRightIcon } from "../icons/icons";
import { MappedHomeData } from "@/features/home/components/HomeView";
import { buttonTheme, ctaTheme } from "@/styles/theme/components";
// 🎯 FIX 1: Apne theme config aur core button theme tokens ko import karein

interface CTASectionProps {
  homeData: MappedHomeData;
}

export default function CTASection({ homeData }: CTASectionProps) {
  const { translate } = useI18n();
  const { contactPath, projectsPath } = homeData;

  const styles = ctaTheme;
  const btnStyles = buttonTheme;

  return (
    <section className={styles.sectionPadding}>
      <div className="container-page relative">
        <AnimatedSection
          // 🎯 FIX 2: Purani rigid glass layer ko clean modern surface container se swap kiya
          className={styles.boxWrapper}
        >
          {/* Ambient background accent tint behind the container text */}
          <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none mix-blend-overlay" />

          <p className={styles.eyebrow}>{translate("cta.bookedStatus")}</p>

          <h2 className={styles.title}>
            {translate("cta.title")}
          </h2>

          <p className={styles.description}>
            {translate("cta.description")}
          </p>

          <div className={styles.buttonContainer}>
            {/* 🎯 FIX 3: Primary "Start Project" Button - Pill rounded, solid accent pop with text-on-accent */}
            <Button
              asChild
              className={`${btnStyles.base} ${btnStyles.variants.solid} w-full sm:w-auto px-7 py-3.5`}
            >
              <Link href={contactPath} className="min-h-[44px] flex items-center justify-center gap-2">
                {translate("home.buttonStart")} <ArrowUpRightIcon size={16} />
              </Link>
            </Button>

            {/* 🎯 FIX 4: Secondary "View Projects" Button - Smooth contrast border outline style */}
            <Button
              asChild
              className={`${btnStyles.base} ${btnStyles.variants.outline} w-full sm:w-auto px-7 py-3.5`}
            >
              <Link href={projectsPath} className="min-h-[44px] flex items-center justify-center">
                {translate("home.buttonView")}
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}