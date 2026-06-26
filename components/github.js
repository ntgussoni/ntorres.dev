/* eslint-disable import/prefer-default-export */
import { buildRecentRepositories } from '../lib/github-recent';

export const GITHUB_REVALIDATE_SECONDS = 60 * 60 * 24;

export async function getContributions(token) {
  if (!token) return null;

  const body = {
    query: `query {
      user(login: "ntgussoni") {
        bio
        repositoriesContributedTo(
          first: 24
          orderBy: { field: PUSHED_AT, direction: DESC }
          contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]
        ) {
          nodes {
            id
            url
            name
            nameWithOwner
            description
            pushedAt
            stargazerCount
            primaryLanguage {
              name
              color
            }
            owner {
              login
              avatarUrl
              url
            }
          }
        }
        contributionsCollection {
          pullRequestContributions(first: 40) {
            nodes {
              occurredAt
              pullRequest {
                title
                url
                merged
                repository {
                  nameWithOwner
                }
              }
            }
          }
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }`,
  };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('GitHub API request failed:', response.status);
      return null;
    }

    const { data, errors } = await response.json();
    if (errors?.length) {
      console.log('GitHub API errors:', errors[0]?.message);
      return null;
    }

    const user = data?.user ?? null;
    if (!user) return null;

    return {
      ...user,
      recentRepositories: buildRecentRepositories(user),
    };
  } catch (e) {
    console.log('The data could not be loaded');
    return null;
  }
}
