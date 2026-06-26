const MAX_ITEMS = 10;

export function RecentContributions({ repositories = [] }) {
  const items = repositories.filter(Boolean).slice(0, MAX_ITEMS);

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Recent contributions
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">
          Open-source work on GitHub —{' '}
          <a
            href="https://github.com/ntgussoni"
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
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        Recent contributions
      </h3>
      <ul className="divide-y divide-neutral-100">
        {items.map(({ id, name, description, url, owner }) => (
          <li key={id || url} className="py-3 first:pt-0 last:pb-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="font-medium text-neutral-900 group-hover:text-neutral-600">
                {name}
              </span>
              {owner?.login && (
                <span className="ml-2 text-sm text-neutral-400">
                  {owner.login}
                </span>
              )}
              {description && (
                <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                  {description}
                </p>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
