/** Parse DD/MM/YYYY from post frontmatter for sorting. */
export function parsePostDateRaw(dateStr) {
  const str = String(dateStr).trim();
  const dmy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const [, day, month, year] = dmy;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

export function sortPosts(posts) {
  return [...posts].sort((a, b) => {
    const dateA = parsePostDateRaw(a.post.metadata.dateRaw ?? a.post.metadata.date);
    const dateB = parsePostDateRaw(b.post.metadata.dateRaw ?? b.post.metadata.date);
    if (dateB - dateA !== 0) return dateB - dateA;
    const orderA = a.post.metadata.seriesOrder ?? 0;
    const orderB = b.post.metadata.seriesOrder ?? 0;
    return orderA - orderB;
  });
}
