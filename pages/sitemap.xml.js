import { getSitemapXml } from '../lib/sitemap';

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(getSitemapXml());
  res.end();

  return { props: {} };
}
