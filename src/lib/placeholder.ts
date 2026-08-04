/**
 * Generates a placeholder image data URI for development.
 * Replace these with actual images from the CMS in production.
 */
export function getPlaceholder(
  width: number,
  height: number,
  text: string = "Lumière & Stone"
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="#064E3B" width="${width}" height="${height}"/>
    <text fill="#F9F8F6" font-family="serif" font-size="${Math.min(width, height) * 0.06}" text-anchor="middle" x="${width / 2}" y="${height / 2}">${text}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
