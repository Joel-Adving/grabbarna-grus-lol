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
    minimumCacheTTL: 60 * 60 * 24 * 7 // 7 days
  },
  output: 'standalone'
}

module.exports = nextConfig
