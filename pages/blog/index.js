import Link from "next/link";
import Card from "../../components/Card";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import { Category } from "../../components/Category";

const Blog = ({ posts, filters }) => {
  const [highlighted, ...old] = posts;

  return (
    <>
      <Head>
        <title>Blog - Nicolás Torres</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col w-full mb-8">
        <Link
          key={highlighted.slug}
          href="/blog/[slug]"
          as={`/blog/${highlighted.slug}`}
        >
          <a>
            <Card post={highlighted} forceBig />
          </a>
        </Link>

        {old.map((p, index) => (
          <>
            <Link key={p.slug} href="/blog/[slug]" as={`/blog/${p.slug}`}>
              <a>
                <Card post={p} />
              </a>
            </Link>
            {index !== old.length - 1 && <hr></hr>}
          </>
        ))}

        {/* <div className="flex flex-row fixed left-0 bottom-0 p-4 w-full bg-white z-20 border-t-2">
				<label>
					<span className="mr-2">Filter:</span>
					{filters.map((c) => (
						<Category key={c} id={c} onClick={} className="mr-2" />
					))}
				</label>
			</div> */}
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
  const filters = [
    ...new Set(posts.map((p) => p.metadata.categories || []).flat(1)),
  ];
  return {
    props: {
      posts,
      filters,
    },
  };
}

export default Blog;
