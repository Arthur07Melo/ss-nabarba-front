import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: '**', // Permite qualquer hostname
      // },
      {
        protocol: 'https',
        hostname: '**', // Permite qualquer hostname
      },
    ],
  },
};

export default nextConfig;
