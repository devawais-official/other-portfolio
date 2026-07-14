/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.medium.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
    ],
  },
};

export default nextConfig;
