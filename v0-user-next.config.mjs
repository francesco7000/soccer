/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA config
  experimental: {
    // Rimuovo ppr perché richiede la versione canary di Next.js
  },
  // Configurazione per PWA
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  // Configurazione per il service worker
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
