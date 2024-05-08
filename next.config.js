/** @type {import('next').NextConfig} */
const { nextTranslate } = require("next-translate");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = {
  ...nextTranslate,
  ...nextConfig,
};
