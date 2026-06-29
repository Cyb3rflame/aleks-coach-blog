/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/proof', destination: '/proof.html' },
    ];
  },
};

module.exports = nextConfig;