import { cn } from "@/lib/cn";

type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  display?: boolean;
};

const sizes = {
  h1: "text-5xl md:text-7xl lg:text-[88px] leading-[0.95]",
  h2: "text-4xl md:text-5xl lg:text-6xl leading-[1.02]",
  h3: "text-2xl md:text-3xl leading-tight",
  h4: "text-xl md:text-2xl leading-snug",
};

export function Heading({ children, as: As = "h2", className, display = true }: HeadingProps) {
  return (
    <As
      className={cn(
        display && "font-display",
        "text-fg tracking-[-0.02em] text-balance",
        sizes[As],
        className,
      )}
    >
      {children}
    </As>
  );
}
