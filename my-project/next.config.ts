import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  images: {
    qualities: [75, 85, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",

        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
