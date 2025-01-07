/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com/",
        port: "",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Bỏ qua kiểm tra typescript
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua kiểm tra eslint trong build
  },
};

export default nextConfig;
