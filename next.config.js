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
            {
                protocol: 'https',
                hostname: 'www.bing.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img-s-msn-com.akamaized.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
