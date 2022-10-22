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
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.bing.com',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
