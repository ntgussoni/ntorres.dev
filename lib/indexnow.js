import { getSiteUrl } from './site';
import { getSitemapXml } from './sitemap';

export const INDEXNOW_KEY = '2b2a1e630d7d3399d46fc699ff67952f';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export function getIndexNowHost() {
  return new URL(getSiteUrl()).host;
}

export function getIndexNowKeyLocation() {
  return `${getSiteUrl()}/${INDEXNOW_KEY}.txt`;
}

export function getSitemapUrls() {
  const xml = getSitemapXml();
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml))) {
    urls.push(match[1]);
  }
  return urls;
}

export async function submitIndexNow(urls = getSitemapUrls()) {
  if (!urls.length) {
    return { ok: false, status: 0, body: 'No URLs to submit' };
  }

  const host = getIndexNowHost();
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: getIndexNowKeyLocation(),
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  const ok = res.status === 200 || res.status === 202;

  return { ok, status: res.status, body, count: urls.length };
}
