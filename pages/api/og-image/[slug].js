import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export default function handler(req, res) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string' || slug.includes('..') || slug.includes('/')) {
    res.status(400).end();
    return;
  }

  const postDir = path.join(process.cwd(), 'posts', slug);
  const mdxPath = path.join(postDir, 'index.mdx');
  let imageName = 'card.png';

  if (fs.existsSync(mdxPath)) {
    const { data } = matter(fs.readFileSync(mdxPath, 'utf8'));
    if (data.image) imageName = data.image;
  }

  const imagePath = path.join(postDir, imageName);
  const fallbackPath = path.join(process.cwd(), 'public/og/default.png');
  const filePath = fs.existsSync(imagePath) ? imagePath : fallbackPath;

  if (!fs.existsSync(filePath)) {
    res.status(404).end();
    return;
  }

  const ext = path.extname(filePath).toLowerCase();

  res.setHeader('Content-Type', MIME[ext] || 'image/png');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=604800'
  );
  fs.createReadStream(filePath).pipe(res);
}
