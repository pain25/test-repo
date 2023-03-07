/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "gateway.pinata.cloud"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
