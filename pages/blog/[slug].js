/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import fs from 'fs';
import Head from 'next/head';

import { MDXRemote } from 'next-mdx-remote';
import kebabCase from 'lodash.kebabcase';

import getPost from '../../components/get-post';
import Layout from '../../components/Layout';
import ToC from '../../components/TableOfContents';
import { PostImage } from '../../components/PostImage';

const getLabelFromChildren = (children) => {
  let label = '';

  React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      label += child;
    }
  });

  return label;
};

const loadComponents = (folderName) => ({
  img: (props) => <PostImage folderName={folderName} {...props} />,
  h2: ({ children, ...props }) => (
    <h2 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} id={kebabCase(getLabelFromChildren(children))}>
      {children}
    </h3>
  ),
});

const Post = ({ folderName, post: { metadata, mdxSource } }) => {
  const components = useMemo(() => loadComponents(folderName), [folderName]);

  return (
    <Layout showGradient={false}>
      <Head>
        <title>{metadata.title} - Nicolás Torres</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-row min-w-[280px] w-full h-[364px] rounded-[16px] shadow-boxes bg-gradient-to-bl from-[#F2994A] to-[#EB5757] px-8 items-center">
        <div className="w-full flex-[30%]">
          <PostImage
            folderName={folderName}
            src={metadata.image}
            alt={metadata.title}
          />
        </div>
        <div className="flex-2 lg:ml-8">
          <div className="font-roboto font-bold text-3xl md:text-4xl mb-4">
            {metadata.title}
          </div>
          <div className="font-roboto font-light text-xl">
            {metadata.description}
          </div>
          <div className="inline-flex flex-col font-roboto font-light text-base mb-6 mt-2">
            <hr className="w-[calc(100%+100px)]" />
            <div className="mt-2 flex-wrap">
              <span className="">
                <b>{metadata.date}</b>
              </span>
              <span className="ml-2 hidden md:inline-flex">
                {metadata.categories.map((c) => (
                  <span key={c} className="ml-2">
                    #{c}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="prose mt-8 lg:pl-4">
          <MDXRemote {...mdxSource} components={components} />
        </div>
        <div className="relative hidden lg:flex">
          <ToC />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const post = await getPost(slug);
  return {
    props: { post, folderName: slug }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const folders = fs.readdirSync(`${process.cwd()}/posts`);

  const paths = folders.map((folder) => ({
    params: {
      slug: folder,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Post;
