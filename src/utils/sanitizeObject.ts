import sanitizeHtml from "sanitize-html";

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] =
      typeof value === "string"
        ? sanitizeHtml(value, {
      allowedTags: [
        "p", "b", "i", "em", "strong", "a", "ul", "ol", "li", "blockquote", "code", "pre", "br", "h1", "h2", "h3"
      ],
      allowedAttributes: {
        a: ["href", "target"]
      }
    })
        : value;
  }

  return sanitized;
}
