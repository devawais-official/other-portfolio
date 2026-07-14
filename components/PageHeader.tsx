import AnimatedSection from "./AnimatedSection";
import GradientBlob from "./GradientBlob";

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
      <GradientBlob className="left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-primary/20" />
      <div className="container-page relative">
        <AnimatedSection>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">{description}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
