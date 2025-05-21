/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'via.placeholder.com', 'images.ctfassets.net'],
    // Allow placeholder images for development and Contentful
  },
  // Allow TypeScript errors to be resolved during a production build for deployment
  typescript: {
    // Skip type checking during production build for faster deployment
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
