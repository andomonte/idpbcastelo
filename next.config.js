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
    images: {
      domains: ['sistemaidpb.s3.amazonaws.com'],
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.node = {
          fs: 'empty',
        };
      }

      return config;
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ['pt-BR'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'pt-BR',
      // This is a list of locale domains and the default locale they
      // should handle (these are only required when setting up domain routing)
      // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    },
    webpack5: false,

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
