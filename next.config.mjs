/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Vercel supports Next.js image optimization out of the box.
    // If you want to use unoptimized images (not recommended), set to true:
    unoptimized: false,
  },

  typescript: {
    ignoreBuildErrors: true, // keep only if you want builds to pass with TS errors
  },

  eslint: {
    ignoreDuringBuilds: true, // keep only if you want builds to pass with ESLint errors
  },
};

export default nextConfig;
