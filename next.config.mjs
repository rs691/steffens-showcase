/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static site on GitHub Pages
  basePath: '/steffens-showcase/', // Repo name
  assetPrefix: '/steffens-showcase/',
  images: {
    unoptimized: true // Disable image optimization
  }
};

export default nextConfig;
