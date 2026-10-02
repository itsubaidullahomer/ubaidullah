/**
 * Structured data as a plain, server-rendered <script>, so it is in the
 * HTML crawlers download. (next/script injects inline scripts with
 * JavaScript after load, which crawlers that don't run JS never see.)
 * "<" is escaped so content can't close the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
