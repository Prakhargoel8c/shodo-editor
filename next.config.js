/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/github',
        destination: 'https://github.com/Prakhargoel8c/shodo-ai',
        permanent: true,
      },
      {
        source: '/feedback',
        destination: 'https://github.com/Prakhargoel8c/shodo-ai/issues',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
