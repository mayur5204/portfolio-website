import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export for GitHub Pages
  trailingSlash: true, // Add trailing slash to URLs
  images: {
    unoptimized: true, // For static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
  // Optional: Set a custom asset prefix if needed
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://mayur5204.github.io/portfolio-website' : '',
};

export default nextConfig;
