import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parsePostDateRaw } from './sort-posts';

const POSTS_DIR = path.join(process.cwd(), 'posts');

export function isDraftVisible() {
  return Boolean(
    process.env.IS_DEVELOPMENT || process.env.NODE_ENV === 'development'
  );
}

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs.readdirSync(POSTS_DIR).filter((slug) => {
    const filePath = path.join(POSTS_DIR, slug, 'index.mdx');
    return fs.existsSync(filePath);
  });
}

export function getPostFilePath(slug) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return null;
  const filePath = path.join(POSTS_DIR, slug, 'index.mdx');
  return fs.existsSync(filePath) ? filePath : null;
}

export function readPostSource(slug) {
  const filePath = getPostFilePath(slug);
  if (!filePath) return null;
  return fs.readFileSync(filePath, 'utf8');
}

export function getPublishedPosts() {
  const showDrafts = isDraftVisible();

  return getPostSlugs()
    .map((slug) => {
      const filePath = getPostFilePath(slug);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(source);

      if (!showDrafts && data.draft) return null;

      const date = parsePostDateRaw(data.date);
      const lastmod = date.toISOString().slice(0, 10);

      return {
        slug,
        title: data.title,
        draft: Boolean(data.draft),
        lastmod,
        date,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date - a.date);
}
