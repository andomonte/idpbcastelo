import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// Configure one or more authentication providers
const options = {
  providers: [
    // ...add more providers here
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }
        // If you return null or false then the credentials will be rejected
        return null;
        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'        // Redirect to a URL
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log(
        `user=${user.name}, account=${account.provider}, profile=${profile.email}`,
      );
      if (
        account.provider === 'google' &&
        profile.verified_email === true &&
        profile.email.endsWith('andomonte@gmail.com')
      ) {
        return true;
      }
      return false;
    },
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};
export default (req, res) => NextAuth(req, res, options);
