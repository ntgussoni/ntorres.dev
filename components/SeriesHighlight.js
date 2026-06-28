import Link from 'next/link';
import { PostImage } from './PostImage';

export default function SeriesHighlight({
  seriesName,
  folderName,
  post,
  totalParts,
}) {
  const { metadata } = post;

  return (
    <section aria-labelledby="featured-series-heading" className="mb-16">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Featured series
          </p>
          <h2
            id="featured-series-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl"
          >
            {seriesName}
          </h2>
        </div>
        <span className="shrink-0 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
          {totalParts} parts
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
          <Link
            href={`/blog/${folderName}`}
            className="group relative block aspect-[3/2] w-full self-start overflow-hidden bg-neutral-100"
          >
            {metadata.image && (
              <PostImage
                folderName={folderName}
                src={metadata.image}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            )}
          </Link>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-medium text-neutral-500">
              Part 1 of {totalParts}
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[1.75rem]">
              <Link
                href={`/blog/${folderName}`}
                className="transition-colors hover:text-neutral-600"
              >
                {metadata.title}
              </Link>
            </h3>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              {metadata.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/blog/${folderName}`}
                className="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Start reading
                <span aria-hidden="true" className="ml-1.5">
                  →
                </span>
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                All posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
