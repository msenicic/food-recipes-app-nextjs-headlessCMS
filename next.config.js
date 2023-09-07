/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['recipes-for-food.000webhostapp.com']
  }
}

module.exports = nextConfig
