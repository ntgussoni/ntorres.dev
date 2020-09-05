import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import ReactMarkdown from "react-markdown/with-html";
import { Blockquote } from "../../components/Blockquote";
import { Paragraph } from "../../components/Paragraph";
import { Image } from "../../components/Image";
import { CodeBlock } from "../../components/CodeBlock";
import { BaseImage } from "../../components/BaseImage";
import { DateComponent } from "../../components/DateComponent";
import { Categories } from "../../components/Categories";

const Post = ({ post: { metadata, content } }) => {
  return (
    <>
      <Head>
        <title>{metadata.title} - Nicolás Torres</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div id="content">
        <BaseImage
          className="object-cover h-3/12 w-screen md:max-w-2xl mb-6"
          src={metadata.image}
          alt={metadata.title}
        />
        <div className="w-screen md:max-w-2xl flex flex-col text-left px-4 md:px-0">
          <h1>{metadata.title}</h1>
          <div className="flex flex-row align-middle mb-1">
            <DateComponent
              className="flex text-xs items-center mr-2"
              date={metadata.date}
            />
            {metadata.categories && (
              <Categories categories={metadata.categories} />
            )}
          </div>
          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{
              code: CodeBlock,
              image: Image,
              paragraph: Paragraph,
              blockquote: Blockquote,
            }}
          />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(data.date).toLocaleDateString(
    "en-US",
    options
  );

  const metadata = {
    ...data,
    date: formattedDate,
  };

  return {
    props: { post: { content, metadata } }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Post;
