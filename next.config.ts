import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/portfolio-2025' : '',
  assetPrefix: isProd ? '/portfolio-2025' : '',
  images: {
    unoptimized: true
  },
};

export default nextConfig;
