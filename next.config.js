/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 1000,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'cursor4shitposting2.vercel.app']
    }
  }
};

module.exports = nextConfig;
