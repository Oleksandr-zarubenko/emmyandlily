/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",

        port: "",
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/en',
        destination: '/ua',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/en/:slug',
        destination: '/ua/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
