export const SITE_NAME = 'Nicolás Torres';

const DEFAULT_DESCRIPTION =
  'Fullstack engineer writing on AI, robotics, and building software.';

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://ntorres.dev';
}

export function absoluteUrl(path = '/') {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getDefaultOgImage() {
  return absoluteUrl('/og/default.png');
}

export function getPostOgImageUrl(slug) {
  return absoluteUrl(`/api/og-image/${slug}`);
}

export const siteDefaults = {
  description: DEFAULT_DESCRIPTION,
  twitterHandle: '@ntorresdev',
};
