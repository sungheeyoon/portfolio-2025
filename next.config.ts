import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/portfolio-2025',
  assetPrefix: '/portfolio-2025/',
  images: {
    unoptimized: true
  },
};

export default nextConfig;
