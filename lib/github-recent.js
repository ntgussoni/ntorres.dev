const MAX_RECENT = 10;

const relativeTime = (isoDate) => {
  const date = new Date(isoDate);
  const diffMs = date.getTime() - Date.now();
  const minutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30));
  const years = Math.round(diffMs / (1000 * 60 * 60 * 24 * 365));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  if (Math.abs(days) < 30) return rtf.format(days, 'day');
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  return rtf.format(years, 'year');
};

export function buildRecentRepositories(user) {
  const repos = user?.repositoriesContributedTo?.nodes?.filter(Boolean) ?? [];
  const prNodes =
    user?.contributionsCollection?.pullRequestContributions?.nodes?.filter(
      Boolean
    ) ?? [];

  const latestActivityByRepo = new Map();

  for (const { occurredAt, pullRequest } of prNodes) {
    const repo = pullRequest?.repository;
    if (!repo?.nameWithOwner || !occurredAt) continue;

    const existing = latestActivityByRepo.get(repo.nameWithOwner);
    if (!existing || occurredAt > existing.occurredAt) {
      latestActivityByRepo.set(repo.nameWithOwner, {
        occurredAt,
        pullRequest,
      });
    }
  }

  return repos
    .map((repo) => {
      const activity = latestActivityByRepo.get(repo.nameWithOwner);
      const lastActivityAt = activity?.occurredAt ?? repo.pushedAt;
      const lastPullRequest = activity?.pullRequest ?? null;

      return {
        id: repo.id,
        url: repo.url,
        name: repo.name,
        nameWithOwner: repo.nameWithOwner,
        description: repo.description,
        pushedAt: repo.pushedAt,
        lastActivityAt,
        lastActivityLabel: lastActivityAt ? relativeTime(lastActivityAt) : null,
        lastPullRequest: lastPullRequest
          ? {
              title: lastPullRequest.title,
              url: lastPullRequest.url,
              merged: lastPullRequest.merged,
              label: lastPullRequest.merged ? 'Merged PR' : 'Opened PR',
            }
          : null,
        primaryLanguage: repo.primaryLanguage,
        stargazerCount: repo.stargazerCount ?? 0,
        owner: repo.owner,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.lastActivityAt ?? 0).getTime() -
        new Date(a.lastActivityAt ?? 0).getTime()
    )
    .slice(0, MAX_RECENT);
}

export { relativeTime, MAX_RECENT };
