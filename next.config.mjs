/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/enquiries',
        destination: `${backendUrl}/api/enquiries`,
      },
      {
        source: '/api/enquiry',
        destination: `${backendUrl}/api/enquiries`,
      },
      {
        source: '/api/health',
        destination: `${backendUrl}/api/health`,
      },
    ];
  },
};

export default nextConfig;
