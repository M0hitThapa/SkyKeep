import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://shiny-hippopotamus-431.convex.cloud/api/storage/**')],
  },
};

export default nextConfig;
