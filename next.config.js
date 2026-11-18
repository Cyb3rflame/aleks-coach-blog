/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/proof', destination: '/proof.html' },
      { source: '/offers', destination: '/offers.html' },
    ];
  },
};

export default nextConfig;