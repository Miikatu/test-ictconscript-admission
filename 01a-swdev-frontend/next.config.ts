import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '01a-swdev-frontend';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: './',
  trailingSlash: true,
};

export default nextConfig;
