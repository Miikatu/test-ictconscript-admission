import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '01a-swdev-frontend';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}/out` : '',
  assetPrefix: isProd ? `/${repoName}/out` : '',
};

export default nextConfig;
