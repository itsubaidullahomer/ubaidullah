import Link from "next/link";
import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  interactive?: boolean;
};

export function Card({ children, className, href, external, interactive = !!href }: CardProps) {
  const cls = cn(
    "group glass relative block overflow-hidden rounded-[var(--radius-glass)] p-6 md:p-8",
    interactive &&
      "transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:[box-shadow:inset_0_1px_0_0_var(--glass-highlight),0_24px_48px_-16px_rgba(0,0,0,0.4)]",
    className,
  );

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <div className={cls}>{children}</div>;
}
