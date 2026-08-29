import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[var(--accent-fg)] hover:shadow-[0_8px_32px_-8px_var(--accent-glow)] hover:-translate-y-px",
  secondary: "glass text-fg hover:bg-[var(--glass-highlight)] hover:-translate-y-px",
  ghost: "text-fg hover:bg-[var(--glass-tint)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-200 ease-[var(--ease-out-expo)] will-change-transform disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = CommonProps &
  ({ href: string } | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }));

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    withArrow,
    external,
    ...rest
  } = props as ButtonProps & { href?: string };

  const cls = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const isExternal = external ?? /^https?:\/\//.test(rest.href);
    if (isExternal) {
      return (
        <a href={rest.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {content}
        </a>
      );
    }
    return (
      <Link href={rest.href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {content}
    </button>
  );
}
