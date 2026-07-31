export function getReadingTime(sections = []) {
  const words = sections
    .flatMap((section) => section.paragraphs || [])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 210));
}
