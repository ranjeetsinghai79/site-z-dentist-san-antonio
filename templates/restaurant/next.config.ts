import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "scontent-den2-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
    ],
  },
};

export default nextConfig;
