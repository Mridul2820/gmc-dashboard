import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/brands",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
