/**
 * Ensures image URLs use HTTPS protocol to prevent mixed content warnings
 * @param url - The image URL to process
 * @returns HTTPS version of the URL
 */
export function ensureHttps(url: string | undefined | null): string {
  if (!url) return '';
  return url.replace(/^http:/, 'https:');
}

/**
 * Handles image loading errors by providing a fallback
 * @param event - The error event
 * @param fallbackUrl - Optional fallback image URL
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl?: string
) {
  const target = event.currentTarget;
  if (fallbackUrl) {
    target.src = ensureHttps(fallbackUrl);
  } else {
    // Set a default placeholder
    target.style.display = 'none';
  }
}
