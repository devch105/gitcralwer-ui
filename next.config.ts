import type { NextConfig } from "next";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/backend/:path*", destination: `${BACKEND}/:path*` },
    ];
  },
};

export default nextConfig;