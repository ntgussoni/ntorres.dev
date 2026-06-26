const GITHUB_PROFILE = 'https://github.com/ntgussoni';

const formatDayLabel = (date, count) => {
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const noun = count === 1 ? 'contribution' : 'contributions';
  return count > 0
    ? `${count} ${noun} on ${formatted}`
    : `No contributions on ${formatted}`;
};

export function ContributionGraph({ calendar, username = 'ntgussoni', className }) {
  const weeks = calendar?.weeks;
  if (!weeks?.length) return null;

  const total = calendar.totalContributions ?? 0;
  const weekCount = weeks.length;

  return (
    <div className={className ?? 'mt-6 w-full min-w-0 max-w-full sm:max-w-xl'}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm text-neutral-600">
          <span className="font-medium text-neutral-900">
            {total.toLocaleString()}
          </span>{' '}
          contributions in the last year
        </p>
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
        >
          @{username}
        </a>
      </div>

      <div className="w-full min-w-0">
        <div
          className="grid w-full gap-[2px] sm:gap-[3px]"
          style={{
            gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
            gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))`,
            gridAutoFlow: 'column',
          }}
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
          {weeks.map((week) =>
            week.contributionDays.map((day) => (
              <span
                key={day.date}
                title={formatDayLabel(day.date, day.contributionCount)}
                style={{ backgroundColor: day.color }}
                className="aspect-square w-full min-w-0 rounded-[2px] sm:rounded-sm"
              />
            ))
          )}
        </div>
      </div>

      <p className="mt-2 text-xs text-neutral-400">
        Hover a square for details ·{' '}
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-neutral-700"
        >
          View on GitHub
        </a>
      </p>
    </div>
  );
}
