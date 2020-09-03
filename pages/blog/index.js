import Link from "next/link";
import Card from "../../components/Card";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";

const Blog = ({ posts }) => {
  const [highlighted, ...old] = posts;

  return (
    <>
      <Head>
        <title>Blog - Nicolás Torres</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col w-full">
        <Link
          key={highlighted.slug}
          href="/blog/[slug]"
          as={`/blog/${highlighted.slug}`}
        >
          <a>
            <Card post={highlighted} forceBig />
          </a>
        </Link>

        {old.map((p) => (
          <Link key={p.slug} href="/blog/[slug]" as={`/blog/${p.slug}`}>
            <a>
              <Card post={p} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/posts`);

  const posts = files
    .map((filename) => {
      const markdownWithMetadata = fs
        .readFileSync(`posts/${filename}`)
        .toString();

      const { data } = matter(markdownWithMetadata);
      // Convert post date to format: Month day, Year
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Date(data.date).toLocaleDateString(
        "en-US",
        options
      );

      const metadata = {
        ...data,
        originalDate: data.date,
        date: formattedDate,
      };

      return {
        slug: filename.replace(".md", ""),
        metadata,
      };
    })
    .sort(
      (a, z) =>
        new Date(z.metadata.originalDate) - new Date(a.metadata.originalDate)
    );

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
