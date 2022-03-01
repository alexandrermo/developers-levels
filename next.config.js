/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/developers',
                permanent: true
            }
        ];
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

module.exports = nextConfig;
