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
      description="Designing, building, and running unattended AI coding loops: the building blocks, patterns, model tiering, hard realities, and how loop engineering differs from graph engineering."
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
          or the{' '}
          <a
            href="/blog/claude-code-hooks-guide"
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          >
            Claude Code hooks guide
          </a>{' '}
          for the guardrails, then come back for the loop architecture.
        </p>
      </header>
      <section className="mb-10 sm:mb-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Loop engineering vs graph engineering
        </h2>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          Loop engineering entered the AI vocabulary in late 2025 and dominated
          developer discussion through mid 2026. Graph engineering arrived
          roughly six weeks after that, in July 2026, and it is the newest and
          least settled of the labels.
        </p>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          The practical difference is where control flow lives. A loop repeats
          one agent over a cycle it owns, and keeps its memory between passes in
          external state such as a queue, a report file, or CI. A graph declares
          the topology instead: which steps or agents run, in what order, and how
          work hands off between them, usually as an explicit directed graph or
          state machine. Treat graphs as a layer above loops rather than a
          replacement for them, and stay on a single loop until the cycle itself
          is the bottleneck before reaching for explicit topology and multiple
          agents. This series covers the loop layer end to end.
        </p>
      </section>
      <section className="mb-10 sm:mb-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          The Anthropic loop engineering playbook
        </h2>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          Most people searching for this are looking for the working style the
          Claude Code team describes. Boris Cherny, who leads Claude Code at
          Anthropic, put it as not prompting Claude anymore, but having loops
          running that prompt Claude while he writes the loops. That framing is
          the starting point for the whole series, which is written around a real
          repo with a real issue queue rather than a toy example.
        </p>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          Start with{' '}
          <a
            href="/blog/loop-engineering-the-end-of-prompting"
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          >
            The End of Prompting
          </a>{' '}
          for the shift itself, then{' '}
          <a
            href="/blog/loop-engineering-the-five-building-blocks"
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          >
            The Five Building Blocks + Memory
          </a>{' '}
          for the parts every loop needs.
        </p>
      </section>
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
