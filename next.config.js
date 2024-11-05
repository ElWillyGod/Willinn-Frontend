/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/users/login',
                destination: 'http://localhost:5000/UserControllers/users/login',
                permanent: false,
            },
        ];
},
};

module.exports = nextConfig
