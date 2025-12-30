import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: "export",            // ✅ Required for Netlify static export
  images: {
    unoptimized: true,         // ✅ Disable Next.js image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
