import { absoluteUrl } from './site';
import { getPublishedPosts } from './posts';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(loc, lastmod) {
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodLine}
  </url>`;
}

export function getSitemapXml() {
  const posts = getPublishedPosts();
  const staticRoutes = [
    { path: '/', lastmod: null },
    { path: '/blog', lastmod: posts[0]?.lastmod ?? null },
    { path: '/about-me', lastmod: null },
    { path: '/contact-me', lastmod: null },
  ];

  const entries = [
    ...staticRoutes.map(({ path, lastmod }) =>
      urlEntry(absoluteUrl(path), lastmod)
    ),
    ...posts.map((post) =>
      urlEntry(absoluteUrl(`/blog/${post.slug}`), post.lastmod)
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;
}
