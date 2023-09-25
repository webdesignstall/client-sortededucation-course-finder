/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "api.sortededucation.com"],
  },
};

module.exports = nextConfig;
