import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arquivos.colibex.com.br",
      },
    ],
  },
};

export default nextConfig;
