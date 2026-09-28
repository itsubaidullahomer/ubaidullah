import Link from "next/link";
import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  interactive?: boolean;
};

/**
 * Flat, bordered surface. Interactive cards lift a touch and their border
 * brightens; nothing blurs or glows.
 */
export function Card({ children, className, href, external, interactive = !!href }: CardProps) {
  const cls = cn(
    "group surface relative block overflow-hidden rounded-2xl p-6 md:p-8",
    interactive &&
      "transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]",
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
