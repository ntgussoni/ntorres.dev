/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/blog/:slug.md',
        destination: '/api/blog/:slug/markdown',
      },
    ];
  },
};

module.exports = nextConfig;
