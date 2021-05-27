import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
// import useSWR from 'swr';
// import fetch from 'unfetch';

// const data = getUsuarios();
// Configure one or more authentication providers

/* function Useres() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR('/api/getUser', fetcher);
  valorUsuario = 'JSON.parse(JSON.stringify(data))';
 // console.log(valorUsuario);
  return data;
} */

// const fetcher = (url) => fetch(url).then((r) => r.json());
// const { data } => //useSWR('/api/getUser', fetcher);
// console.log(data);
const options = {
  pages: {
    //  signIn: '/auth/signin',
    //  signOut: '/auth/signout',
    //   error: '/auth/error', // Error code passed in query string as ?error=
    //   verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/userPerfil', // If set, new users will be directed here on first sign in
  },
  providers: [
    // ...add more providers here
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      // callbackUrl: `${window.location.origin}/pefil`, // $ { id }
    }),
    /*   Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }), */
  ],
  callbacks: {
    async signIn(user, account, profile) {
      //      const dados = await prisma.Usuarios({ loginUsuario: user });

      // if (!data) return <div>loading...</div>;
      //   return <div>hello {data.name}!</div>;

      /* const dados = JSON.parse(
        JSON.stringify(usuarios.filter((item) => item.email === profile.email)),
      ); */
      //   const verifiedEmail = dados[0].email;

      // console.log(profile.email, dados[0], valorUsuario);
      if (
        account.provider === 'google' &&
        profile.verified_email === true //  profile.email.endsWith(verifiedEmail)
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
