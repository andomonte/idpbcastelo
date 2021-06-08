/* module.exports = {
  env: {
    MYSQL_HOST: 'mysql669.umbler.com',
    MYSQL_PORT: '41890',
    MYSQL_DATABASE: 'db_idpb',
    MYSQL_USER: 'idpbsystem',
    MYSQL_PASSWORD: 'idpbMM981341',
  },
};
 */
// next.config.js

const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa');

module.exports = withPlugins([
  {
    env: {
      MYSQL_HOST: 'mysql669.umbler.com',
      MYSQL_PORT: '41890',
      MYSQL_DATABASE: 'db_idpb',
      MYSQL_USER: 'idpbsystem',
      MYSQL_PASSWORD: 'idpbMM981341',
    },
  },

  withPWA,
  {
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
      register: true,
      skipWaiting: true,
      sw: '/sw.js',
    },
  },

  // your other plugins here
]);
