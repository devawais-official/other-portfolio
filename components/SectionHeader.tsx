import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  actionText,
  actionHref,
  className = "",
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      </div>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary-light transition-colors hover:text-primary"
        >
          {actionText} <ArrowUpRight size={15} />
        </Link>
      )}
    </AnimatedSection>
  );
}
