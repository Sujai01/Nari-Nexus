import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Configure image optimization to use external domains if necessary, and support optimized formats
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
