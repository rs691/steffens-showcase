/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static site on GitHub Pages
  basePath: '/rs691.github.io/steffens-showcase', // Repo name
  assetPrefix: '/rs691.github.io/steffens-showcase/',
  images: {
    unoptimized: true // Disable image optimization
  }
};

export default nextConfig;
