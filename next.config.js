/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/deccan-landing',
  assetPrefix: '/deccan-landing/',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@components": "./src/components",
      "@app": "./src/app",
      "@styles": "./src/styles",
      "@utils": "./src/utils",
      "@lib": "./src/lib",
      "@context": "./src/context",
      "@constants": "./src/constants",
      "@interfaces": "./src/interfaces",
      "@hooks": "./src/hooks",
    };
    return config;
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
