import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  size?: "narrow" | "default" | "wide";
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export function Section({
  children,
  className,
  innerClassName,
  id,
  size = "default",
  eyebrow,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <Container size={size} className={innerClassName}>
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-2xl md:mb-16">
            {eyebrow && (
              <div className="text-fg-muted mb-4 flex items-center gap-2 text-xs tracking-[0.18em] uppercase">
                <span className="bg-fg-subtle h-px w-6" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-fg text-4xl leading-[1.05] text-balance md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-fg-muted mt-5 max-w-xl text-lg leading-relaxed text-pretty">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
