import { absoluteUrl } from '../lib/site';

export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  const body = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(body);
  res.end();

  return { props: {} };
}
