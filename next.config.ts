import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true, // ← додай це
  },
};

export default nextConfig;