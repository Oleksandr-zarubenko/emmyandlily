import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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
  // async redirects() {
  //   return [
  //     // Basic redirect
  //     {
  //       source: "/en",
  //       destination: "/uk",
  //       permanent: true,
  //     },
  //     // Wildcard path matching
  //     {
  //       source: "/en/:slug",
  //       destination: "/uk/:slug",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default withNextIntl(nextConfig);
