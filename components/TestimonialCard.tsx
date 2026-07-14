import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

function initialsFrom(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="card-surface flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <Quote size={20} className="text-primary-light opacity-70" />
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-accent text-accent" />
          ))}
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">&ldquo;{t.message}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-semibold text-primary-light">
          {initialsFrom(t.clientName)}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{t.clientName}</p>
          <p className="text-xs text-muted">
            {t.clientRole}
          </p>
        </div>
      </div>
    </div>
  );
}
