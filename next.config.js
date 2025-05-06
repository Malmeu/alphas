/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour l'hébergement mutualisé
  trailingSlash: true,
  images: {
    domains: ['wjyadfujajdeuojxtzar.supabase.co', 'lunatech.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
