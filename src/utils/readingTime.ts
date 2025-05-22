/**
 * Calculates the estimated reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes as a string with appropriate formatting
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute = 200,
): string {
  // Remove all HTML tags
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Count the words
  const wordCount = cleanText.trim().split(/\s+/).length;

  // Calculate reading time in minutes
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  // Format the output
  if (readingTime === 1) {
    return "1 min read";
  }
  return `${readingTime} min read`;
}

/**
 * Returns an appropriate class name based on reading time for visual indication
 * @param readingTime Reading time string from calculateReadingTime
 * @returns CSS class name for styling
 */
export function getReadingTimeClass(readingTime: string): string {
  const minutes = parseInt(readingTime);

  if (minutes <= 3) {
    return "text-green-600 dark:text-green-400"; // Short read
  } else if (minutes <= 7) {
    return "text-yellow-600 dark:text-yellow-400"; // Medium read
  } else {
    return "text-orange-600 dark:text-orange-400"; // Long read
  }
}
