import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'test-ictconscript-admission';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};

export default nextConfig;
