"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useI18n } from "@/i18n/i18n-provider";
import AnimatedSection from "../layout/AnimatedSection";

export default function CTASection() {
  const { translate } = useI18n();

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-page relative">
        {/* 🎯 CORE CHANGE: Applied liquid-glass, soft border-primary, and subtle glow shadow to the main card */}
        <AnimatedSection className="liquid-glass flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-16 border border-primary/15 shadow-2xl shadow-primary/5">
          <p className="eyebrow">{translate("cta.bookedStatus")}</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl text-ink">
            {translate("cta.title")}
          </h2>
          <p className="max-w-md text-muted text-sm leading-relaxed">
            {translate("cta.description")}
          </p>

          {/* Buttons Container */}
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-center w-full sm:w-auto">
            {/* Primary Button: Standard dynamic btn-primary gradient design */}
            <Button asChild className="btn-primary rounded-full w-full sm:w-auto px-7 py-3">
              <Link href="/contact" className="min-h-[44px] flex items-center justify-center gap-2">
                {translate("cta.startProject")} <ArrowUpRight size={16} />
              </Link>
            </Button>

            {/* Secondary Button: Overwriting basic outline with consistent rounded-full capsule & smooth border */}
            <Button
              asChild
              variant="outline"
              className="rounded-full border border-white/10 bg-white/[0.03] text-ink/80 hover:bg-white/[0.08] hover:text-ink hover:border-white/20 transition-all duration-300 w-full sm:w-auto px-7 py-3"
            >
              <Link href="/projects" className="min-h-[44px] flex items-center justify-center">
                {translate("cta.seeWork")}
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}