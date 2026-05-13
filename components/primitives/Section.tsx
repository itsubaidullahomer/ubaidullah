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
          <header className="mb-12 md:mb-16 max-w-2xl">
            {eyebrow && (
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-muted">
                <span className="h-px w-6 bg-fg-subtle" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance text-fg">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-lg text-fg-muted text-pretty max-w-xl leading-relaxed">
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
