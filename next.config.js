/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "build",
  // output: "export",
  // trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

