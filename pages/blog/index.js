import fs from 'fs';
import BlogLayout from '../../components/BlogLayout';
import getPost from '../../components/get-post';
import { BlogPostList } from '../../components/BlogPostList';
import { sortPosts } from '../../lib/sort-posts';

export default function BlogIndex({ posts }) {
  return (
    <BlogLayout
      description="Writing on AI, engineering, and building software."
      path="/blog"
    >
      <header className="mb-10 border-b border-neutral-200 pb-8 sm:mb-12 sm:pb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          Writing on AI, engineering, and building software.
        </p>
      </header>
      <BlogPostList posts={posts} />
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const folders = fs.readdirSync(`${process.cwd()}/posts`);

  const posts = await Promise.all(
    folders.map(
      (folder) =>
        new Promise((resolve) =>
          getPost(folder).then((post) => resolve({ folderName: folder, post }))
        )
    )
  );

  const published = process.env.IS_DEVELOPMENT
    ? posts
    : posts.filter((p) => !p.post.metadata.draft);

  return {
    props: {
      posts: sortPosts(published),
    },
  };
}
