import Layout from '../components/Layout';
import Image from 'next/image';
import profilePic from '../public/avatar.png';
import { getContributions } from '../components/github';
const path = require('path');

const posts = [
  {
    title: 'Serverless email in Vercel',
    description: '#technology #vercel #serverless',
    image: path.resolve('card-image.png'),
  },
  {
    title: 'Serverless email in Vercel',
    description: '#technology #vercel #serverless',
    image: path.resolve('card-image.png'),
  },
  {
    title: 'Serverless email in Vercel',
    description: '#technology #vercel #serverless',
    image: path.resolve('card-image.png'),
  },
  {
    title: 'Serverless email in Vercel',
    description: '#technology #vercel #serverless',
    image: path.resolve('card-image.png'),
  },
  {
    title: 'Serverless email in Vercel',
    description: '#technology #vercel #serverless',
    image: path.resolve('card-image.png'),
  },
];

export async function getServerSideProps(context) {
  const githubData = await getContributions(
    process.env.GITHUB_KEY,
    'ntgussoni'
  );

  if (!githubData) {
    return {
      props: { githubData: [] },
    };
  }

  return {
    props: { githubData }, // will be passed to the page component as props
  };
}
export default function Home({ githubData }) {
  console.log(githubData);
  return (
    <Layout>
      <div className="flex flex-row items-center mb-20">
        <div className="flex-1 ">
          <h1 className="text-2xl md:text-7xl font-bold mb-4">Welcome!</h1>
          <p className="text-1xl max-w-[800px] md:text-3xl">{githubData.bio}</p>
        </div>
        <div className="hidden md:block">
          <Image
            src={profilePic}
            alt="Nicolás Torres"
            width={194}
            height={194}
            layout="fixed"
            className=" ml-8 w-[194px] h-[194px]"
          />
        </div>
      </div>
      <h2 className="text-2xl text-headers mb-9">Latest blog posts</h2>
      <div className="relative  after:z-50 after:flex after:top-0 after:right-0 after:absolute after:h-full after:shadow-scroll mb-12">
        <div className="flex flex-row  overflow-x-auto scroll-snap-mandatory">
          {posts.map((p, index) => (
            <div
              key={index}
              className="scroll-snap-center flex flex-1 flex-col min-w-[280px] w-[280px] h-[364px] rounded-[36px] shadow-boxes bg-gradient-to-bl from-[#F2994A] to-[#EB5757] p-9 items-center justify-center mr-5 last:mr-0"
            >
              <div className="w-[160px] h-[160px]">
                <Image src={p.image} alt={p.title} width={160} height={143} />
              </div>
              <div className="font-roboto font-bold text-[27px] text-center leading-8 mb-4">
                {p.title}
              </div>
              <div className="font-roboto font-light text-xs text-center">
                {p.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl text-headers mb-9">Open source</h2>
      <div className="flex flex-col md:flex-row mb-12 items-center">
        <a
          href="https://github.com/ntgussoni/blitz-guard"
          className="flex flex-1 flex-col max-w-[50%] min-w-[280px] w-[280px] h-[364px] rounded-[36px] shadow-boxes bg-gradient-to-bl from-[#2F80ED] to-[#9B51E0] p-9 items-center justify-center mb-4 md:mb-0 md:mr-5 last:mr-0"
        >
          <div className="h-[174px]">
            <Image
              src={path.resolve('blitz-guard.png')}
              alt={'Blitz Guard'}
              width={524}
              height={174}
            />
          </div>
          <div className="w-full font-roboto font-bold text-[27px] leading-8 mb-4 text-left">
            Blitz Guard
          </div>
          <div className="w-full font-roboto font-light text-lg text-left">
            The centralized permission based authorization for Blitz.js
          </div>
        </a>
        {githubData && (
          <div className="flex flex-1 flex-col max-w-[50%] min-w-[280px] w-[280px] h-[364px] rounded-[36px] shadow-boxes bg-[#343434] p-9 ">
            <div className="overflow-x-auto">
              {githubData.repositoriesContributedTo.nodes.map(
                ({ name, description, url }, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row w-full items-start lg:items-center mb-4"
                  >
                    <div className="flex flex-col flex-[70%]">
                      <a href={url} target="_blank" rel="nofollow">
                        <span className="font-roboto font-bold text-lg mb-2">
                          {name}
                        </span>
                      </a>
                      <span className="hidden xl:block font-roboto font-light text-lg">
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
