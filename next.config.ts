/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'as2.ftcdn.net',
        pathname: '/**', // Ini sudah benar
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**', // Perbaiki typo di sini
      },
    ],
  },
};

module.exports = nextConfig;
