"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import GradientBlob from "./GradientBlob";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="section-pad relative overflow-hidden">
      <GradientBlob className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-accent/10" />
      <div className="container-page relative">
        <AnimatedSection className="card-surface flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-16">
          <p className="eyebrow">{t("cta.bookedStatus")}</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="max-w-md text-muted">
            {t("cta.description")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="solid">
              <Link href="/contact" className="min-h-[44px] flex items-center justify-center">
                {t("cta.startProject")} <ArrowUpRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects" className="min-h-[44px] flex items-center justify-center">
                {t("cta.seeWork")}
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
