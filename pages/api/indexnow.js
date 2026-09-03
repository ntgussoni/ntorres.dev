import { getSitemapUrls, submitIndexNow } from '../../lib/indexnow';

function isAuthorized(req) {
  const expected = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!expected) return process.env.VERCEL_ENV === 'production' && req.headers['x-vercel-cron'] === '1';

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.headers['x-indexnow-secret'];
  return token === expected;
}

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end('Method Not Allowed');
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return res.status(204).end();
  }

  const requested = Array.isArray(req.body?.urls) ? req.body.urls : getSitemapUrls();
  const result = await submitIndexNow(requested);

  return res.status(result.ok ? 202 : 502).json(result);
}
