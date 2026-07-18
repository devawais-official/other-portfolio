import AnimatedSection from "@/components/layout/AnimatedSection";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 sm:pt-24">
      <div className="container-page relative">
        <AnimatedSection>
          <p className="eyebrow font-semibold">{eyebrow}</p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl text-ink">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base text-ink/85 sm:text-lg leading-relaxed antialiased">
            {description}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}