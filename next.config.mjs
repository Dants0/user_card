/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["randomuser.me"]
    },
    env: {
        QUOTES_API_KEY: process.env.API_KEY.toString()
    }
};

export default nextConfig;
