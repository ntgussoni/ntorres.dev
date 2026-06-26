const GITHUB_PROFILE = 'https://github.com/ntgussoni';

function LanguageBadge({ language }) {
  if (!language?.name) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: language.color ?? '#a3a3a3' }}
        aria-hidden="true"
      />
      {language.name}
    </span>
  );
}

function ContributionRow({ repo }) {
  const {
    url,
    nameWithOwner,
    description,
    lastActivityLabel,
    lastPullRequest,
    primaryLanguage,
    stargazerCount,
    owner,
  } = repo;

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-50"
      >
        {owner?.avatarUrl && (
          <img
            src={owner.avatarUrl}
            alt=""
            width={36}
            height={36}
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-neutral-100 ring-1 ring-neutral-200"
            loading="lazy"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="truncate text-sm font-medium text-neutral-900 group-hover:text-neutral-600">
              {nameWithOwner}
            </p>
            {lastActivityLabel && (
              <time
                dateTime={repo.lastActivityAt}
                className="shrink-0 text-xs text-neutral-400"
              >
                {lastActivityLabel}
              </time>
            )}
          </div>

          {lastPullRequest?.title && (
            <p className="mt-0.5 truncate text-xs text-neutral-500">
              <span className="font-medium text-neutral-600">
                {lastPullRequest.label}
              </span>
              {' · '}
              {lastPullRequest.title}
            </p>
          )}

          {description && (
            <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-neutral-500">
              {description}
            </p>
          )}

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <LanguageBadge language={primaryLanguage} />
            {stargazerCount > 0 && (
              <span className="text-xs text-neutral-500">
                ★ {stargazerCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </a>
    </li>
  );
}

export function RecentContributions({ repositories = [] }) {
  const items = repositories.filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Recent contributions
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600">
          Open-source work on GitHub —{' '}
          <a
            href={GITHUB_PROFILE}
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ntgussoni
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-neutral-100 pb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Recent contributions
        </h3>
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          View profile →
        </a>
      </div>

      <ul className="-mx-2 max-h-[28rem] space-y-0.5 overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible">
        {items.map((repo) => (
          <ContributionRow key={repo.id || repo.nameWithOwner} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
