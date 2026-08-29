import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
};

const SIZES = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  children,
  className,
  size = "default",
  as: As = "div",
}: ContainerProps) {
  return <As className={cn("mx-auto w-full px-6 md:px-10", SIZES[size], className)}>{children}</As>;
}
