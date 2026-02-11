/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.0.11:3000"],

  images: {
    // Vercel supports Next.js image optimization out of the box.
    // If you want to use unoptimized images (not recommended), set to true:
    unoptimized: false,
  },

  typescript: {
    // ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true, // keep only if you want builds to pass with ESLint errors
  },
};

export default nextConfig;
