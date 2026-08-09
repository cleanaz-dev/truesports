import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.espncdn.com" }, // covers a., a1-4., combiner., s., etc.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;