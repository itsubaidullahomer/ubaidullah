import { cn } from "@/lib/cn";

export type Token = { text: string; accent?: boolean };

type StreamHeadlineProps = {
  tokens: Token[];
  className?: string;
  as?: "h1" | "h2" | "p";
};

/**
 * A headline that arrives one word at a time with a caret, the way a
 * model streams tokens. Pure CSS (see `.stream` in globals.css), so the
 * full text is in the server HTML and the animation costs no JS.
 */
export function StreamHeadline({ tokens, className, as: As = "h1" }: StreamHeadlineProps) {
  return (
    <As className={cn("stream", className)}>
      {tokens.map((t, i) => (
        <span key={i}>
          <span className={cn("tok", t.accent && "accent-italic")} style={{ ["--i" as string]: i }}>
            {t.text}
          </span>
          {i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </As>
  );
}
