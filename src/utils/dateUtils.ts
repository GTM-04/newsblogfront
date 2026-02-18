/**
 * Safely formats a date string to a readable format
 * @param dateString - The date string to format (ISO format)
 * @param fallback - Fallback text if date is invalid
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | undefined | null,
  fallback: string = 'Date not available'
): string {
  if (!dateString) return fallback;
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return fallback;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return fallback;
  }
}

/**
 * Formats a date with a preferred date if available, otherwise uses a fallback date
 * @param preferredDate - The preferred date to use
 * @param fallbackDate - The fallback date if preferred is not available
 * @param defaultText - Default text if both dates are invalid
 * @returns Formatted date string
 */
export function formatDateWithFallback(
  preferredDate: string | undefined | null,
  fallbackDate: string | undefined | null,
  defaultText: string = 'Date not available'
): string {
  return formatDate(preferredDate || fallbackDate || '', defaultText);
}
