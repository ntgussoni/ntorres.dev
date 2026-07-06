import { readPostSource, isDraftVisible } from '../../../../lib/posts';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end('Method Not Allowed');
  }

  const { slug } = req.query;
  const source = readPostSource(slug);

  if (!source) {
    return res.status(404).end('Not found');
  }

  const { data } = matter(source);
  if (!isDraftVisible() && data.draft) {
    return res.status(404).end('Not found');
  }

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'HEAD') {
    res.setHeader('Content-Length', Buffer.byteLength(source, 'utf8'));
    return res.status(200).end();
  }

  return res.status(200).send(source);
}
