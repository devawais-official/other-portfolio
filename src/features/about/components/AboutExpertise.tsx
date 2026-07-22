// src/features/about/components/AboutExpertise.tsx
"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/i18n/i18n-client";
import {
  AndroidIcon,
  FlutterIcon,
  LanguageIcon,
  StackOutlinedIcon,
  ToolIcon,
} from "@/components/icons/icons";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import type { ExpertiseGroup } from "../types";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface AboutExpertiseProps {
  expertiseGroups: ExpertiseGroup[];
}

// ============================================================================
// ICON LOOKUP MAP (FIXED ICON BUG)
// ============================================================================
const getGroupIcon = (label: string) => {
  const cleanLabel = label.toLowerCase();
  const iconProps = {
    className: "shrink-0 text-sm text-primary",
    "aria-hidden": true,
  };

  if (cleanLabel.includes("lang") || cleanLabel.includes("coding")) {
    return <LanguageIcon {...iconProps} />;
  }
  if (cleanLabel.includes("multi") || cleanLabel.includes("kmp") || cleanLabel.includes("cross")) {
    return <StackOutlinedIcon {...iconProps} />;
  }
  if (cleanLabel.includes("flutter")) {
    return <FlutterIcon {...iconProps} />;
  }
  if (cleanLabel.includes("arch") || cleanLabel.includes("design")) {
    return <StackOutlinedIcon {...iconProps} />;
  }
  if (cleanLabel.includes("tool") || cleanLabel.includes("env")) {
    return <ToolIcon {...iconProps} />;
  }

  return <AndroidIcon {...iconProps} />;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AboutExpertise({ expertiseGroups }: AboutExpertiseProps) {
  const { translate } = useI18n();

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Section Header */}
      <div>
        <SectionHeader
          eyebrow={translate("about.expertiseTitle")}
          title={translate("about.expertiseSubtitle")}
        />
      </div>

      {/* Expertise Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {expertiseGroups.map((group, i) => (
          <AnimatedSection
            key={group.label}
            delay={i * 0.05}
            className="group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-xl border border-border/20 bg-surface/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-surface/70"
          >
            {/* Ambient Hover Glow */}
            <div
              className="pointer-events-none absolute -right-4 -top-4 h-12 w-12 rounded-full bg-primary/5 blur-xl transition-all duration-300 group-hover:bg-primary/15"
              aria-hidden="true"
            />

            {/* Header: Dynamic Icon + Category Label */}
            <div className="flex items-center gap-2 border-b border-border/15 pb-2.5">
              {getGroupIcon(group.label)}
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                {group.label}
              </h3>
            </div>

            {/* Tag Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item, itemIdx) => (
                <span
                  key={`${group.label}-${item}-${itemIdx}`}
                  className="rounded-lg border border-border/20 bg-surface/80 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary-light"
                >
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}