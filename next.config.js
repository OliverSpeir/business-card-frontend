/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pychfmxkgzjaaywqujqc.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
