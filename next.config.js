/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.coinranking.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
