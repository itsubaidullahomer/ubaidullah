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
    "bg-accent text-accent-fg hover:bg-accent-bright hover:shadow-[0_12px_32px_-12px_var(--accent-glow)]",
  secondary: "border border-border-strong text-fg hover:border-fg-muted hover:bg-tint",
  ghost: "text-fg-muted hover:text-fg hover:bg-tint",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-13 px-6 text-[15px]",
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] will-change-transform active:translate-y-px disabled:opacity-50 disabled:pointer-events-none";

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
