/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote';
import kebabCase from 'lodash.kebabcase';

import getPost from '../../components/get-post';
import BlogLayout from '../../components/BlogLayout';
import ToC from '../../components/TableOfContents';
import { PostImage } from '../../components/PostImage';
import SeriesNav from '../../components/SeriesNav';
import CopyPageMenu from '../../components/CopyPageMenu';
import { getPostOgImageUrl, absoluteUrl } from '../../lib/site';
import profilePic from '../../public/avatar.png';

const getLoopEngineeringSeries = () => {
  const postsDir = path.join(process.cwd(), 'posts');

  return fs
    .readdirSync(postsDir)
    .map((slug) => {
      const filePath = path.join(postsDir, slug, 'index.mdx');
      if (!fs.existsSync(filePath)) return null;

      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      if (!data.seriesOrder) return null;

      return { slug, order: data.seriesOrder, title: data.title };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
};

const getLabelFromChildren = (children) => {
  let label = '';
  React.Children.map(children, (child) => {
    if (typeof child === 'string') label += child;
    if (typeof child === 'object' && child?.props?.children) {
      label += getLabelFromChildren(child.props.children);
    }
  });
  return label;
};

const getPlainText = (children) => {
  let text = '';
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') text += child;
    else if (child?.props?.children) text += getPlainText(child.props.children);
  });
  return text;
};

const formatCategory = (category) =>
  category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const loadComponents = (folderName) => ({
  img: (props) => <PostImage folderName={folderName} {...props} />,
  h1: ({ children, ...props }) => (
    <h2 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h2>
  ),
  h2: ({ children, ...props }) => (
    <h3 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h3>
  ),
  h3: ({ children, ...props }) => (
    <h4 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h4>
  ),
  h4: ({ children, ...props }) => (
    <h5 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h5>
  ),
  h5: ({ children, ...props }) => (
    <h6 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h6>
  ),
  h6: ({ children, ...props }) => (
    <h6 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => {
    const text = getPlainText(children);
    if (text.includes('Loop Engineering series')) {
      return null;
    }
    return <p {...props}>{children}</p>;
  },
  hr: () => (
    <hr className="not-prose my-12 border-0 border-t border-neutral-200" />
  ),
});

const parsePostDateIso = (dateStr) => {
  const str = String(dateStr).trim();
  const dmy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const [, day, month, year] = dmy;
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
  }
  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const Post = ({ folderName, post: { metadata, mdxSource }, seriesNav }) => {
  const components = useMemo(() => loadComponents(folderName), [folderName]);
  const category = metadata.categories?.[0];
  const publishedTime = parsePostDateIso(metadata.dateRaw);
  const ogImage = getPostOgImageUrl(folderName);
  const postUrl = absoluteUrl(`/blog/${folderName}`);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: metadata.title,
      description: metadata.description,
      image: [ogImage],
      datePublished: publishedTime,
      dateModified: publishedTime,
      author: {
        '@type': 'Person',
        name: 'Nicolás Torres',
        url: absoluteUrl('/about-me'),
      },
      publisher: {
        '@type': 'Person',
        name: 'Nicolás Torres',
        url: absoluteUrl('/about-me'),
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
    },
  ];

  if (Array.isArray(metadata.faq) && metadata.faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: metadata.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return (
    <BlogLayout
      title={metadata.title}
      description={metadata.description}
      image={ogImage}
      path={`/blog/${folderName}`}
      type="article"
      publishedTime={publishedTime}
      jsonLd={jsonLd}
    >
      <article>
        <header className="mb-8 max-w-2xl border-b border-neutral-200 pb-8 sm:mb-10 sm:pb-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
              <Link
                href="/blog"
                className="font-medium text-neutral-700 hover:text-neutral-900"
              >
                Blog
              </Link>
              {category && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{formatCategory(category)}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <time dateTime={metadata.dateRaw}>{metadata.date}</time>
            </div>
            <CopyPageMenu slug={folderName} title={metadata.title} />
          </div>

          {metadata.image && (
            <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 sm:mb-8">
              <PostImage
                folderName={folderName}
                src={metadata.image}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}

          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-[2.75rem] md:leading-[1.15]">
            {metadata.title}
          </h1>

          {metadata.description && (
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              {metadata.description}
            </p>
          )}

          <div className="mt-5 flex items-center gap-2.5">
            <Image
              src={profilePic}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <p className="text-sm text-neutral-500">Nicolás Torres</p>
          </div>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
          <div className="prose-blog min-w-0 max-w-2xl flex-1">
            <ToC variant="mobile" contentKey={folderName} />
            {seriesNav && (
              <SeriesNav
                posts={seriesNav.posts}
                currentIndex={seriesNav.currentIndex}
                variant="top"
              />
            )}
            <MDXRemote {...mdxSource} components={components} />
            {Array.isArray(metadata.faq) && metadata.faq.length > 0 && (
              <section aria-label="Frequently asked questions" className="mt-12">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                  Frequently asked questions
                </h2>
                <div className="mt-6 space-y-6">
                  {metadata.faq.map((item) => (
                    <div key={item.question}>
                      <h3 className="text-base font-semibold text-neutral-900">
                        {item.question}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-neutral-600">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {seriesNav && (
              <SeriesNav
                posts={seriesNav.posts}
                currentIndex={seriesNav.currentIndex}
                variant="footer"
              />
            )}
          </div>
          <aside className="sticky top-20 z-10 hidden w-44 shrink-0 self-start lg:block">
            <ToC variant="desktop" contentKey={folderName} />
          </aside>
        </div>
      </article>
    </BlogLayout>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const post = await getPost(slug);
  const series = getLoopEngineeringSeries();
  const currentIndex = series.findIndex((entry) => entry.slug === slug);

  return {
    props: {
      post,
      folderName: slug,
      seriesNav:
        currentIndex >= 0
          ? { posts: series, currentIndex }
          : null,
    },
  };
}

export async function getStaticPaths() {
  const folders = fs.readdirSync(`${process.cwd()}/posts`);
  return {
    paths: folders.map((folder) => ({ params: { slug: folder } })),
    fallback: false,
  };
}

export default Post;
