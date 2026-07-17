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
        <AnimatedSection className="card-surface flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-16">
          <p className="eyebrow">{translate("cta.bookedStatus")}</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {translate("cta.title")}
          </h2>
          <p className="max-w-md text-muted">
            {translate("cta.description")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="solid">
              <Link href="/contact" className="min-h-[44px] flex items-center justify-center">
                {translate("cta.startProject")} <ArrowUpRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline">
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
