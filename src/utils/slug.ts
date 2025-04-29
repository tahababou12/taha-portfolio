/**
 * Converts a string to a URL-friendly slug
 * Example: "BragAI: ML Project" -> "bragai-ml-project"
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
    .trim();
}

/**
 * Get project slug - helper to ensure consistent slug generation
 */
export function getProjectSlug(title: string): string {
  return createSlug(title);
} 