/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/github',
        destination: 'https://github.com/Prakhargoel8c/notion-clone',
        permanent: true,
      },
      {
        source: '/feedback',
        destination: 'https://github.com/Prakhargoel8c/notion-clone/issues',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
