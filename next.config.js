/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/users/login',
                destination: ''
            },
        ];
},
};

module.exports = nextConfig
