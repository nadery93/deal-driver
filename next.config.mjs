/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "placehold.co"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb"
    }
  }
};

export default nextConfig;
