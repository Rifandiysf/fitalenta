import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
        protocol: "https",
        hostname: "www.fitalenta.co.id",
      }, {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      }
    ]
  }
};

export default nextConfig;
