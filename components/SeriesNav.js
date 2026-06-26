import Link from 'next/link';
import clsx from 'clsx';

export default function SeriesNav({ posts, currentIndex, variant = 'top' }) {
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const isLast = currentIndex === posts.length - 1;
  const showRestart = isLast && variant === 'footer';
  const part = currentIndex + 1;
  const total = posts.length;
  const progress = (part / total) * 100;

  return (
    <nav
      aria-label="Loop Engineering series navigation"
      className={clsx(
        'not-prose rounded-xl border border-neutral-200 bg-neutral-50',
        variant === 'top' ? '-mt-2 mb-10' : 'mt-12',
      )}
    >
      <div className="border-b border-neutral-200 px-4 py-3 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Loop Engineering series
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-sm font-semibold text-neutral-900">
            Part {part} of {total}
          </span>
          <div
            className="h-2 min-w-[6rem] flex-1 overflow-hidden rounded-full bg-neutral-200 sm:max-w-xs"
            role="progressbar"
            aria-valuenow={part}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Part ${part} of ${total}`}
          >
            <div
              className="h-full rounded-full bg-neutral-900 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-stretch sm:gap-3 sm:px-5 sm:py-4">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-100 sm:px-4"
          >
            <span
              aria-hidden="true"
              className="shrink-0 text-neutral-400 transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium text-neutral-500">
                Previous
              </span>
              <span className="block truncate font-medium text-neutral-900">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div className="hidden min-w-0 flex-1 sm:block" aria-hidden="true" />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-100 sm:px-4"
          >
            <span className="min-w-0 text-right">
              <span className="block text-xs font-medium text-neutral-500">
                Next
              </span>
              <span className="block truncate font-medium text-neutral-900">
                {next.title}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ) : showRestart ? (
          <Link
            href={`/blog/${posts[0].slug}`}
            className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg border border-neutral-900 bg-neutral-900 px-3 py-2.5 text-sm text-white shadow-sm transition-colors hover:bg-neutral-800 sm:px-4"
          >
            <span className="min-w-0 text-right">
              <span className="block text-xs font-medium text-neutral-300">
                Finished the series?
              </span>
              <span className="block truncate font-medium">
                Start from the beginning
              </span>
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ) : (
          <div className="hidden min-w-0 flex-1 sm:block" aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
