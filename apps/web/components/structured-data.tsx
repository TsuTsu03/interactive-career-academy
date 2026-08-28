/**
 * Renders authored JSON-LD for search engines and answer engines. The payload
 * is built from curriculum data on the server, never from learner input, and
 * `<` is escaped so a future authored string cannot close the script tag.
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
