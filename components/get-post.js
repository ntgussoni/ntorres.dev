import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import matter from 'gray-matter';

const getPost = async (slug) => {
  const folderName = slug;
  const fileName = path.join(process.cwd(), 'posts', folderName, 'index.mdx');
  const markdownWithMetadata = fs.readFileSync(fileName).toString();

  const { data, content } = matter(markdownWithMetadata);
  if (
    !data.title ||
    !data.date ||
    !data.categories ||
    !data.title ||
    !data.description
  ) {
    throw new Error(`Post ${fileName} is invalid`);
  }

  // Convert post date to format: Month day, Year
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(data.date).toLocaleDateString(
    'en-US',
    options
  );

  const metadata = {
    ...data,
    date: formattedDate,
  };

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [],
    },
  });

  return { folderName, mdxSource, metadata };
};

export default getPost;
