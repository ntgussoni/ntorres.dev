const SITE = 'https://ntorres.dev';
const KEY = '2b2a1e630d7d3399d46fc699ff67952f';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function parseSitemapUrls(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml))) {
    urls.push(match[1]);
  }
  return urls;
}

const extra = process.argv.slice(2);
const xml = await fetch(`${SITE}/sitemap.xml`).then((res) => {
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status}`);
  }
  return res.text();
});

const urlList = extra.length ? extra : parseSitemapUrls(xml);
const payload = {
  host: new URL(SITE).host,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

const body = await res.text();
const ok = res.status === 200 || res.status === 202;

console.log(
  JSON.stringify(
    {
      keyLocation: payload.keyLocation,
      submitted: urlList.length,
      status: res.status,
      body,
      ok,
    },
    null,
    2
  )
);

if (!ok) {
  process.exit(1);
}
