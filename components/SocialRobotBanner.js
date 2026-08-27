import Image from 'next/image';
import socialrobotIcon from '../public/projects/showcase/socialrobot-icon.png';
import { externalLinkProps } from '../lib/links';

const SOCIALROBOT_URL = 'https://socialrobot.io';

/**
 * SocialRobot promo banner. Two variants:
 * - "hero": full-width card for the top of the landing page
 * - "sidebar": compact card for the blog post side nav
 *
 * Copy leads with the founder story (the problem, why it was built),
 * then the promise. External link is nofollow.
 */
export default function SocialRobotBanner({ variant = 'hero' }) {
  const linkProps = externalLinkProps(SOCIALROBOT_URL);

  if (variant === 'sidebar') {
    return (
      <a
        href={SOCIALROBOT_URL}
        {...linkProps}
        className="group block rounded-xl border border-neutral-200 bg-white p-3 transition-shadow hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          <Image
            src={socialrobotIcon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-md object-contain"
          />
          <p className="text-xs font-semibold text-neutral-900">SocialRobot</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600">
          Social ate my build time, so I built this. A week of posts scheduled
          in one sitting.
        </p>
        <p className="mt-2 text-xs font-medium text-neutral-900 transition-colors group-hover:text-neutral-600">
          Try it
          <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </a>
    );
  }

  return (
    <a
      href={SOCIALROBOT_URL}
      {...linkProps}
      className="group mb-12 flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-8"
    >
      <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
        <Image
          src={socialrobotIcon}
          alt="SocialRobot"
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          SocialRobot
        </p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
          Social was eating my build time, so I built this.
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
          A week of posts scheduled in one sitting. Your feed stays alive while
          you build.
        </p>
      </div>
      <span className="shrink-0 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-neutral-700">
        Get started
        <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </a>
  );
}
