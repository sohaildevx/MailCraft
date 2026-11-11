import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/pricing",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
