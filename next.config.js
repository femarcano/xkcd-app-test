/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgs.xkcd.com', port: '' },
    ],
  },
}

module.exports = nextConfig
