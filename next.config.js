/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/github',
        destination: 'https://github.com/Prakhargoel8c/notion-clone',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
