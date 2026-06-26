import Link from 'next/link';
import clsx from 'clsx';
import { PostImage } from './PostImage';

const formatCategory = (category) =>
  category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export function BlogPostListItem({
  folderName,
  post,
  showImage = false,
  variant = 'light',
}) {
  const { metadata } = post;
  const category = metadata.categories?.[0];
  const isDark = variant === 'dark';
  const imageSrc = metadata.image;

  return (
    <article
      className={clsx(
        'group border-b py-8 first:pt-0 last:border-b-0',
        isDark ? 'border-white/10' : 'border-neutral-200'
      )}
    >
      <Link
        href={`/blog/${folderName}`}
        className={clsx(
          'block',
          showImage && imageSrc && 'md:flex md:items-start md:gap-8'
        )}
      >
        <div className="min-w-0 flex-1">
          <div
            className={clsx(
              'mb-2 flex flex-wrap items-center gap-x-2 text-sm',
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            )}
          >
            {category && (
              <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                {formatCategory(category)}
              </span>
            )}
            {category && <span aria-hidden="true">·</span>}
            <time dateTime={metadata.dateRaw}>{metadata.date}</time>
          </div>
          <h2
            className={clsx(
              'text-xl font-semibold leading-snug tracking-tight transition-colors md:text-2xl',
              isDark
                ? 'text-white group-hover:text-neutral-300'
                : 'text-neutral-900 group-hover:text-neutral-600'
            )}
          >
            {metadata.title}
          </h2>
          <p
            className={clsx(
              'mt-2 line-clamp-2 text-base leading-relaxed',
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            )}
          >
            {metadata.description}
          </p>
        </div>

        {showImage && imageSrc && (
          <div
            className={clsx(
              'relative mt-4 aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border md:mt-1 md:w-40 lg:w-48',
              isDark ? 'border-white/10' : 'border-neutral-200'
            )}
          >
            <PostImage
              folderName={folderName}
              src={imageSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>
        )}
      </Link>
    </article>
  );
}

export function BlogPostList({ posts, showImage = true, variant = 'light' }) {
  return (
    <div>
      {posts.map((entry) => (
        <BlogPostListItem
          key={entry.folderName}
          {...entry}
          showImage={showImage}
          variant={variant}
        />
      ))}
    </div>
  );
}
