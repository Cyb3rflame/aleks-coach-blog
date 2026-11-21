/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old post removed Nov 2026
      { source: '/blog/tennis-serve-drills-no-power', destination: '/blog', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/proof', destination: '/proof.html' },
      { source: '/offers', destination: '/offers.html' },
    ];
  },
};

export default nextConfig;