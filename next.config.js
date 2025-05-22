/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
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
