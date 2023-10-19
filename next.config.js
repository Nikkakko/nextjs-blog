// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = withContentlayer({ ...nextConfig });
