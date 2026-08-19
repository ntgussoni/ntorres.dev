import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogLayout from '../../components/BlogLayout';
import getPost from '../../components/get-post';
import { BlogPostList } from '../../components/BlogPostList';

export default function LoopEngineeringHub({ posts }) {
  return (
    <BlogLayout
      title="Loop Engineering"
      description="Designing, building, and running unattended AI coding loops: the building blocks, patterns, model tiering, and hard realities."
      path="/blog/loop-engineering"
    >
      <header className="mb-10 border-b border-neutral-200 pb-8 sm:mb-12 sm:pb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Loop Engineering
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          Designing, building, and running unattended AI coding loops: the
          building blocks, patterns, model tiering, and hard realities of
          loops that work while you sleep.
        </p>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          Hooks are the enforcement layer inside these loops. Start with the{' '}
          <a
            href="/blog/cursor-hooks-json-guide"
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          >
            Cursor hooks.json guide
          </a>{' '}
          for the guardrails, then come back for the loop architecture.
        </p>
      </header>
      <BlogPostList posts={posts} />
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts');

  const folders = fs
    .readdirSync(postsDir)
    .filter((slug) => {
      const filePath = path.join(postsDir, slug, 'index.mdx');
      if (!fs.existsSync(filePath)) return false;
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      return typeof data.seriesOrder === 'number';
    })
    .sort((a, b) => {
      const orderA = matter(
        fs.readFileSync(path.join(postsDir, a, 'index.mdx'), 'utf8')
      ).data.seriesOrder;
      const orderB = matter(
        fs.readFileSync(path.join(postsDir, b, 'index.mdx'), 'utf8')
      ).data.seriesOrder;
      return orderA - orderB;
    });

  const posts = await Promise.all(
    folders.map(
      (folder) =>
        new Promise((resolve) =>
          getPost(folder).then((post) => resolve({ folderName: folder, post }))
        )
    )
  );

  return {
    props: { posts },
  };
}
