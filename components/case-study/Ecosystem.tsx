import Image from "next/image";
import { Cpu, Globe, Server, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SubProduct } from "@/content/types";

const KIND_ICON = {
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  native: Cpu,
} as const;

const KIND_LABEL = {
  web: "Web app",
  mobile: "Mobile app",
  backend: "Backend",
  native: "Native",
} as const;

/**
 * The products that make up the suite, grouped the way they relate:
 * the shared backend first, then the web apps, then the phone apps.
 */
export function Ecosystem({
  products,
  accent,
  className,
}: {
  products: SubProduct[];
  accent: string;
  className?: string;
}) {
  const hub = products.filter((p) => p.kind === "backend");
  const web = products.filter((p) => p.kind === "web");
  const phones = products.filter((p) => p.kind === "mobile" || p.kind === "native");

  return (
    <div className={cn("space-y-4", className)}>
      {hub.map((p) => (
        <ProductCard key={p.name} product={p} accent={accent} wide />
      ))}
      {web.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {web.map((p) => (
            <ProductCard key={p.name} product={p} accent={accent} />
          ))}
        </div>
      )}
      {phones.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {phones.map((p) => (
            <ProductCard key={p.name} product={p} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product: p,
  accent,
  wide,
}: {
  product: SubProduct;
  accent: string;
  wide?: boolean;
}) {
  const Icon = KIND_ICON[p.kind];
  const isPhone = p.kind === "mobile" || p.kind === "native";
  return (
    <article
      className="glass relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-glass)]"
      style={
        wide
          ? {
              backgroundImage: `radial-gradient(900px circle at top left, color-mix(in oklab, ${accent} 12%, transparent), transparent 60%)`,
            }
          : undefined
      }
    >
      {p.shot && (
        <div
          className={cn(
            "border-border relative overflow-hidden border-b",
            isPhone ? "flex h-52 justify-center px-6 pt-6" : "aspect-[16/9]",
          )}
          style={{
            background: `radial-gradient(120% 100% at 50% 0%, color-mix(in oklab, ${accent} 16%, transparent), transparent 70%)`,
          }}
        >
          <Image
            src={p.shot.src}
            width={p.shot.width}
            height={p.shot.height}
            alt={p.shot.alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            quality={70}
            className={cn(
              isPhone
                ? "h-auto w-32 self-start rounded-t-2xl border border-b-0 border-[var(--border-strong)]"
                : "h-full w-full object-cover object-top",
            )}
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col p-5 md:p-6",
          wide && "md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-10 md:p-8",
        )}
      >
        <div>
          <div className="text-fg-muted flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            {KIND_LABEL[p.kind]} · {p.audience}
          </div>
          <h4 className={cn("font-display text-fg mt-3 leading-tight", wide ? "text-3xl" : "text-2xl")}>
            {p.name}
          </h4>
          <p className="text-fg-muted mt-2.5 text-sm leading-relaxed text-pretty">{p.summary}</p>
        </div>

        <div className={cn("mt-auto pt-5", wide && "md:pt-0")}>
          {p.stat && <div className="text-fg mb-3 font-mono text-[11px]">{p.stat}</div>}
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span
                key={t}
                className="border-border text-fg-muted rounded-full border px-2.5 py-0.5 text-[11px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
