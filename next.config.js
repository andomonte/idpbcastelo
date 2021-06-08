// next.config.js
const withPlugins = require('next-compose-plugins');

// const withPWA = require('next-pwa');

module.exports = withPlugins([
  {
    images: {
      domains: ['storage.googleapis.com'],
    },
    distDir: 'build',
    future: { webpack5: true },
    typescript: {
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    env: {
      MYSQL_HOST: 'mysql669.umbler.com',
      MYSQL_PORT: '41890',
      MYSQL_DATABASE: 'db_idpb',
      MYSQL_USER: 'idpbsystem',
      MYSQL_PASSWORD: 'idpbMM981341',
    },
  },

  // your other plugins here
]);
