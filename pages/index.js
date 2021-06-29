/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import profilePic from '../public/avatar.png';
import { getContributions } from '../components/github';
import getPost from '../components/get-post';
import { PostImage } from '../components/PostImage';

const path = require('path');
const fs = require('fs');

export default function Home({ githubData, posts }) {
  return (
    <Layout>
      <div className="flex flex-row items-center mb-20">
        <div className="flex-1 ">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Welcome!</h1>
          <p className="text-xl max-w-[800px]">{githubData.bio}</p>
        </div>
        <div className="hidden ml-8  md:block w-[180px] h-[180px]">
          <Image src={profilePic} alt="Nicolás Torres" />
        </div>
      </div>
      <h2 className="text-xl text-headers mb-9">Latest blog posts</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-2 justify-items-center mb-12">
        {posts.map(({ folderName, post }) => (
          <Link key={folderName} href={`/blog/${folderName}`} passHref>
            <a className="card hover:animate-zoom-down flex flex-1 flex-col min-w-[210px] w-[210px] h-[273px] rounded-[16px] shadow-boxes hover:shadow-boxesHighlight bg-gradient-to-bl from-[#F2994A] to-[#EB5757] p-5 items-center justify-center ">
              <div className="flex w-full h-full relative">
                <PostImage
                  className="image"
                  folderName={folderName}
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="font-roboto font-bold text-lg text-center leading-8 mb-4">
                {post.metadata.title}
              </div>
              <div className="font-roboto font-light text-xs text-center">
                {post.metadata.description}
              </div>
            </a>
          </Link>
        ))}
      </div>
      <h2 className="text-xl text-headers mb-9">Open source</h2>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] gap-2 justify-items-center">
        <a
          href="https://github.com/ntgussoni/blitz-guard"
          className="card hover:animate-zoom-down flex flex-1 flex-col  h-[273px] rounded-[16px] shadow-boxes bg-gradient-to-bl from-[#2F80ED] to-[#9B51E0] p-5"
        >
          <div className="h-full w-full relative">
            <Image
              className="image"
              src={path.resolve('blitz-guard.png')}
              alt="Blitz Guard"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="w-full font-roboto font-bold text-lg leading-8 text-left">
            Blitz Guard
          </div>
          <div className="w-full font-roboto font-light text-lg text-left">
            The centralized permission based authorization for Blitz.js
          </div>
        </a>
        {githubData && (
          <div className="flex flex-1 flex-col w-full h-[273px] rounded-[16px] shadow-boxes bg-[#343434] p-5 ">
            <div className="overflow-x-auto">
              {githubData.repositoriesContributedTo.nodes.map(
                ({ name, description, url }, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="flex flex-col lg:flex-row w-full items-start lg:items-center mb-4"
                  >
                    <div className="flex flex-col flex-[70%]">
                      <a href={url} target="_blank" rel="nofollow noreferrer">
                        <span className="font-roboto font-bold text-base mb-2">
                          {name}
                        </span>
                      </a>
                      <span className="hidden xl:block font-roboto font-light text-base">
                        {description}
                      </span>
                    </div>
                    {/* <div className="flex flex-col flex-[30%] items-left ml-8">
                  <div className="flex  mb-2">
                    <div className="w-7 h-7 shadow-[0px 0px 4px 2px,rgba(40, 213, 68, 0.25)] rounded-lg bg-gradient-to-bl from-[#0F993C] to-[#28D544]"></div>
                    <span className="text-[#24CC43] ml-4">+1045</span>
                    <span className="text-[#EB5757] ml-4">-95</span>
                  </div>
                  <div className="text-[#828282] text-base">Jan 16th, 2019</div>
                </div> */}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const folders = fs.readdirSync(`${process.cwd()}/posts`);

  const githubData = await getContributions(
    process.env.GITHUB_KEY,
    'ntgussoni'
  );

  const posts = await Promise.all(
    folders.map(
      (folder) =>
        new Promise((resolve) =>
          getPost(folder).then((post) => resolve({ folderName: folder, post }))
        )
    )
  );

  return {
    props: { posts, githubData: githubData || [] }, // will be passed to the page component as props
  };
}
