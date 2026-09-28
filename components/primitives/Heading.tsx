import { cn } from "@/lib/cn";

type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  display?: boolean;
};

const sizes = {
  h1: "text-display",
  h2: "text-title",
  h3: "text-heading",
  h4: "text-xl md:text-2xl leading-snug",
};

export function Heading({ children, as: As = "h2", className, display = true }: HeadingProps) {
  return (
    <As className={cn(display && "font-display", "text-fg text-balance", sizes[As], className)}>
      {children}
    </As>
  );
}
