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
    // minimumCacheTTL: 2592000, // 30 days
    minimumCacheTTL: 10, // 30 days
    deviceSizes: [640, 1080, 1920],
    formats: ['image/avif', 'image/webp']
  },
  output: 'standalone'
}

module.exports = nextConfig
