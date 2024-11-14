/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'as2.ftcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        patahname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
