const isExternalHref = (href) =>
  typeof href === 'string' && /^https?:\/\//i.test(href);

/**
 * URLs that belong to the site owner. These stay followable (dofollow):
 * own products, own GitHub org/profile, own social profiles.
 */
const OWN_HOSTS = new Set([
  'socialrobot.io',
  'www.socialrobot.io',
  'souso.app',
  'cognitiveshuffle.app',
  'bedtimefable.com',
  'clashofapps.com',
  'maidofhonorspeech.net',
  'howtobebestman.com',
  'funeralspeech.net',
]);

const OWN_PATHS = [
  'github.com/ntgussoni',
  'github.com/socialrobot-io',
  'twitter.com/ntorresdev',
  'x.com/ntorresdev',
  'dev.to/ntorresdev',
  'linkedin.com/in/ntgussoni',
];

export const isOwnUrl = (url) => {
  try {
    const { hostname, pathname } = new URL(url);
    if (OWN_HOSTS.has(hostname)) return true;
    const hostPath = `${hostname}${pathname}`;
    return OWN_PATHS.some((prefix) => hostPath.startsWith(prefix));
  } catch {
    return false;
  }
};

/**
 * Link props for external links. Own URLs keep ranking signals (dofollow);
 * third-party URLs get nofollow. Internal links (/, /blog/...) get nothing,
 * so they stay normal, followable links.
 */
export const externalLinkProps = (href) => {
  if (!isExternalHref(href)) return {};
  if (isOwnUrl(href)) {
    return { target: '_blank', rel: 'noopener noreferrer' };
  }
  return { target: '_blank', rel: 'nofollow noopener noreferrer' };
};

export { isExternalHref };
