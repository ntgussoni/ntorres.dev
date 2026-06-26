import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

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

  // Frontmatter uses DD/MM/YYYY (e.g. 25/06/2026)
  const parsePostDate = (dateStr) => {
    const str = String(dateStr).trim();
    const dmy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmy) {
      const [, day, month, year] = dmy;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    const parsed = new Date(str);
    if (!Number.isNaN(parsed.getTime())) return parsed;
    throw new Error(`Invalid date in post ${fileName}: ${str}`);
  };

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = parsePostDate(data.date).toLocaleDateString(
    'en-US',
    options
  );

  const metadata = {
    ...data,
    date: formattedDate,
    dateRaw: data.date,
  };

  const mdxSource = await serialize(content, {
    blockJS: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

  return { folderName, mdxSource, metadata };
};

export default getPost;
