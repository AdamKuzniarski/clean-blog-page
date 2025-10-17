import type { BlogEntry } from "../types/models";

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ");
}

export function normalize(text: string): string {
  if (!text) return "";
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}
/**
 * Prüft, ob Suchbegriff im haystack ist
 */
export function matches(textToSearch: string, searchTerm: string): boolean {
  const normalizedText = normalize(textToSearch);
  const normalizedSearch = normalize(searchTerm);
  if (!normalizedSearch) return true; 
  return normalizedText.includes(normalizedSearch);
}
/**
 * Baut einen durchsuchbaren Text (textToSearch) aus einem Blogpost.
 */
export function toSearchText(entry: BlogEntry): string {
  const combinedTextParts = [
    entry.title ?? "",
    entry.author ?? "",
    entry.teaser ?? "",
    stripHtml(entry.content ?? ""), // Inhalt ohne HTML
  ];
  return combinedTextParts.join(" ");
}
