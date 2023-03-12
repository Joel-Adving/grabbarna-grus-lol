/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7 * 4 // 4 weeks
  },
  output: 'standalone'
}

module.exports = nextConfig
