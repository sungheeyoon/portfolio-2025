import type { NextConfig } from "next";

// GitHub Actions에서는 항상 basePath 적용
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isProd = process.env.NODE_ENV === 'production' || isGitHubActions;

console.log('Build environment:', {
  NODE_ENV: process.env.NODE_ENV,
  GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
  isProd,
  basePath: isProd ? '/portfolio-2025' : ''
});

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/portfolio-2025' : '',
  assetPrefix: isProd ? '/portfolio-2025/' : '',
  images: {
    unoptimized: true
  },
};

export default nextConfig;
