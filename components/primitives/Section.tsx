import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  size?: "narrow" | "default" | "wide";
  eyebrow?: string;
  /** Mono index shown before the eyebrow, e.g. "01". */
  index?: string;
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
  index,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <Container size={size} className={innerClassName}>
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && (
              <div className="label-mono text-fg-muted mb-5 flex items-center gap-3">
                {index && <span className="text-accent">{index}</span>}
                <span className="bg-border-strong h-px w-6" />
                {eyebrow}
              </div>
            )}
            {title && <h2 className="font-display text-title text-fg text-balance">{title}</h2>}
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
