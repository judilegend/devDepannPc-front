const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "undraw.co",
        pathname: "/illustrations/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
