/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/proof', destination: '/proof.html' },
    ];
  },
};

export default nextConfig;