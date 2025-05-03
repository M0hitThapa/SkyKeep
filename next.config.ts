import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:"shiny-hippopotamus-431.convex.cloud",
      }
    ]
  },
};

export default nextConfig;
