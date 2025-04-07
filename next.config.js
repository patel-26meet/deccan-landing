/** @type {import('next').NextConfig} */
const nextConfig = {
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
    };
    return config;
  },
};

module.exports = nextConfig;
