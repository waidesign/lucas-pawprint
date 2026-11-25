/**
 * Serialise structured data for a `<script type="application/ld+json">` tag.
 * `JSON.stringify` doesn't escape `<`, so a string containing `</script>` would end the
 * tag early and let the rest run as HTML. Escaping `<` keeps the JSON identical for parsers.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
