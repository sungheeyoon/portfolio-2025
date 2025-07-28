import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubActions ? '/portfolio-2025' : '',
  assetPrefix: isGithubActions ? '/portfolio-2025/' : '',
  images: {
    unoptimized: true
  },
};

export default nextConfig;
