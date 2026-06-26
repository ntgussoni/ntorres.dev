/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import profilePic from '../public/avatar.png';
import driftIcon from '../public/projects/drift/icon.png';
import bedtimefableIcon from '../public/projects/showcase/bedtimefable-icon.png';
import socialrobotIcon from '../public/projects/showcase/socialrobot-icon.png';
import clashofappsIcon from '../public/projects/showcase/clashofapps-icon.png';
import maidofhonorIcon from '../public/projects/showcase/maidofhonor-icon.png';
import bestmanIcon from '../public/projects/showcase/bestman-icon.png';
import funeralspeechIcon from '../public/projects/showcase/funeralspeech-icon.png';
import sousoIcon from '../public/projects/showcase/souso-icon.png';
import { getContributions, GITHUB_REVALIDATE_SECONDS } from '../components/github';
import getPost from '../components/get-post';
import { BlogPostList } from '../components/BlogPostList';
import { RecentContributions } from '../components/RecentContributions';
import { ContributionGraph } from '../components/ContributionGraph';
import { sortPosts } from '../lib/sort-posts';

const fs = require('fs');

const showcaseProjects = [
  {
    name: 'Drift',
    description: 'One word at a time. Sleep science from SFU.',
    href: '/projects/drift',
    image: driftIcon,
  },
  {
    name: 'Souso',
    description:
      'Your sous chef — weekly meal plans and a ready-to-order grocery basket.',
    href: 'https://souso.app',
    image: sousoIcon,
    external: true,
  },
  {
    name: 'BedtimeFable',
    description: 'Calming sleep stories for adults — narration and gentle music.',
    href: 'https://bedtimefable.com',
    image: bedtimefableIcon,
    external: true,
  },
  {
    name: 'SocialRobot',
    description: 'Create, schedule, and grow across every social platform.',
    href: 'https://socialrobot.io',
    image: socialrobotIcon,
    external: true,
  },
  {
    name: 'Clash of Apps',
    description: 'Analyze Play Store reviews — sentiment and competitors.',
    href: 'https://clashofapps.com',
    image: clashofappsIcon,
    external: true,
  },
  {
    name: 'Maid of Honor Speech',
    description: 'AI speech generator — a personalized maid of honor toast.',
    href: 'https://maidofhonorspeech.net',
    image: maidofhonorIcon,
    external: true,
  },
  {
    name: 'How to Be Best Man',
    description: 'Step-by-step help writing the perfect best man speech.',
    href: 'https://howtobebestman.com',
    image: bestmanIcon,
    external: true,
  },
  {
    name: 'Funeral Speech',
    description: 'Find the right words — heartfelt funeral speeches.',
    href: 'https://funeralspeech.net',
    image: funeralspeechIcon,
    external: true,
  },
];

function ProjectCard({ name, description, href, image, external }) {
  const className =
    'group flex w-full flex-col rounded-xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md';

  const content = (
    <>
      <div className="relative mb-4 h-24 w-24">
        <Image src={image} alt={name} fill className="object-contain" sizes="96px" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-neutral-900 group-hover:text-neutral-600">
        {name}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default function Home({ githubData, posts }) {
  return (
    <Layout wide>
      <div className="mb-12 flex flex-col items-start gap-6 border-b border-neutral-200 pb-12 sm:mb-16 sm:gap-8 sm:pb-16 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Nicolás Torres
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-600">
            {githubData?.bio ||
              'AI / Full Stack engineer building software that makes an impact.'}
          </p>
          <ContributionGraph
            calendar={
              githubData?.contributionsCollection?.contributionCalendar
            }
          />
        </div>
        <div className="shrink-0">
          <Image
            src={profilePic}
            alt="Nicolás Torres"
            width={160}
            height={160}
            className="h-28 w-28 rounded-full md:h-40 md:w-40"
          />
        </div>
      </div>

      <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Latest posts
        </h2>
        <Link
          href="/blog"
          className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
        >
          View all →
        </Link>
      </div>
      <div className="mb-16">
        <BlogPostList posts={posts.slice(0, 3)} />
      </div>

      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        Projects
      </h2>
      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showcaseProjects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>

      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        Open source
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <a
          href="https://github.com/ntgussoni/blitz-guard"
          className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex aspect-[603/268] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-4 py-3">
            <Image
              src="/blitz-guard.png"
              alt="Blitz Guard"
              width={603}
              height={268}
              className="h-full w-full object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600">
            Blitz Guard
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            Centralized permission-based authorization for Blitz.js
          </p>
        </a>
        <RecentContributions
          repositories={githubData?.recentRepositories}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const folders = fs.readdirSync(`${process.cwd()}/posts`);

  const githubData = await getContributions(process.env.GITHUB_KEY);

  const posts = sortPosts(
    await Promise.all(
      folders.map(
        (folder) =>
          new Promise((resolve) =>
            getPost(folder).then((post) => resolve({ folderName: folder, post }))
          )
      )
    )
  );

  return {
    props: {
      posts: process.env.IS_DEVELOPMENT
        ? posts
        : posts.filter((p) => !p.post.metadata.draft),
      githubData,
    },
    revalidate: GITHUB_REVALIDATE_SECONDS,
  };
}
